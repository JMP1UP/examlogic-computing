// Vercel Serverless Function: api/sync.js
// Handles secure, role-filtered database synchronization (GET) and write-through edits (POST).

const db = require('./db');
const auth = require('./auth-helper');
const pusher = require('./pusher-helper');
const { detectSafeguardingFlag } = require('../safeguarding');

module.exports = async function handler(req, res) {
  const allowedDomains = process.env.ALLOWED_DOMAINS
    ? process.env.ALLOWED_DOMAINS.split(',').map(d => d.trim().toLowerCase())
    : ['http://localhost:3000', 'https://www.school-bridge.org'];

  const originHeader = req.headers && req.headers.origin;
  if (originHeader && allowedDomains.includes(originHeader.toLowerCase())) {
    res.setHeader('Access-Control-Allow-Origin', originHeader);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.school-bridge.org');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const authHeader = req.headers && req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = auth.verifyJwt(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }

  const user = await auth.validateSessionDb(decoded);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Session is invalid or revoked' });
  }

  const userId = decoded.id;
  const userRole = decoded.role; // 'student' | 'teacher' | 'coordinator' | 'admin'

  try {
    if (req.method === 'GET') {
      return await handleGetSync(userId, userRole, res);
    } else if (req.method === 'POST') {
      return await handlePostSync(userId, userRole, req.body, res, user);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Sync execution failed:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Helper: strip password_hash from users to prevent exposure
function sanitizeUsers(users) {
  if (!users) return [];
  return users.map(({ password_hash, ...rest }) => rest);
}

// Newer admin-console tables may not exist yet in installations created from
// an older schema. Treat only a confirmed missing-table response as an empty
// optional dataset so one pending migration cannot break the entire snapshot.
async function selectOptionalTable(table) {
  try {
    return await db.select(table);
  } catch (error) {
    const message = String(error?.message || error);
    if (/schema cache|does not exist|could not find the table/i.test(message)) {
      console.warn(`Optional sync table is unavailable: ${table}`);
      return [];
    }
    throw error;
  }
}

// Helper: student-safe serializer for other students' profiles (hides email and internal fields)
function serializeStudentForStudents(students, currentUserId) {
  if (!students) return [];
  return students.map(s => {
    if (s.id === currentUserId) {
      const { password_hash, ...rest } = s;
      return rest;
    }
    return {
      id: s.id,
      name: s.name,
      bio: s.bio,
      languagesSpoken: s.languagesSpoken,
      interests: s.interests,
      subjects: s.subjects,
      photoUrl: s.photoUrl,
      school_id: s.school_id,
      language: s.language
    };
  });
}

// Helper: parse RLS match string e.g. "id=eq.stud_1" -> { id: "stud_1" }
function parseMatch(matchStr) {
  if (!matchStr) return {};
  const match = {};
  const parts = matchStr.split('&');
  for (const part of parts) {
    const eqIdx = part.indexOf('=eq.');
    if (eqIdx !== -1) {
      const key = part.substring(0, eqIdx);
      const val = part.substring(eqIdx + 4);
      match[key] = val;
    }
  }
  return match;
}

// ----------------- GET SNAPSHOT SYNC -----------------
async function handleGetSync(userId, userRole, res) {
  const snapshot = {
    schools: [],
    coordinators: [],
    students: [],
    connections: [],
    messages: [],
    projects: [],
    project_slides: [],
    project_messages: [],
    speed_sessions: [],
    logs: [],
    flags: [],
    news: []
  };

  if (userRole === 'admin') {
    // Admin gets full database access, but password hashes are stripped for safety
    snapshot.schools = await db.select('schools');
    snapshot.coordinators = sanitizeUsers(await db.select('coordinators'));
    snapshot.students = sanitizeUsers(await db.select('students'));
    snapshot.connections = await db.select('connections');
    snapshot.messages = await db.select('messages');
    snapshot.projects = await db.select('projects');
    snapshot.project_slides = await db.select('project_slides');
    snapshot.project_messages = await db.select('project_messages');
    snapshot.speed_sessions = await db.select('speed_sessions');
    snapshot.logs = await db.select('logs');
    snapshot.flags = await db.select('flags');
    snapshot.news = await db.select('news');
    snapshot.school_requests = await selectOptionalTable('school_requests');
    snapshot.invitations = await selectOptionalTable('invitations');
    return res.status(200).json(snapshot);
  }

  if (userRole === 'teacher' || userRole === 'coordinator') {
    const coordList = await db.select('coordinators', `id=eq.${userId}`);
    const coordinator = coordList[0];
    if (!coordinator || !coordinator.approved) {
      return res.status(403).json({ error: 'Forbidden: Coordinator account is pending approval.' });
    }
    const schoolId = coordinator.school_id;

    snapshot.schools = await db.select('schools');
    snapshot.coordinators = sanitizeUsers((await db.select('coordinators', `school_id=eq.${schoolId}`)).filter(c => c.school_id === schoolId));

    if (schoolId) {
      // Find connections involving their school's students to determine active partner schools
      snapshot.connections = await db.select('connections');
      
      // Determine partner school IDs
      const partnerSchoolIds = new Set();
      const connections = snapshot.connections;
      
      // Load all students and filter by school or active partnership
      const allStudents = await db.select('students');
      snapshot.students = sanitizeUsers(allStudents.filter(s => {
        if (s.school_id === schoolId) return true;
        // Check if student has a connection with a student of teacher's school
        const hasConnection = connections.some(c => 
          (c.student_a_id === s.id && allStudents.some(o => o.id === c.student_b_id && o.school_id === schoolId)) ||
          (c.student_b_id === s.id && allStudents.some(o => o.id === c.student_a_id && o.school_id === schoolId))
        );
        if (hasConnection) {
          partnerSchoolIds.add(s.school_id);
          return true;
        }
        return false;
      }));

      // Filter connections to only those involving their school's students
      const myStudentIds = allStudents.filter(s => s.school_id === schoolId).map(s => s.id);
      snapshot.connections = connections.filter(c => 
        myStudentIds.includes(c.student_a_id) || myStudentIds.includes(c.student_b_id)
      );

      // Fetch messages inside those connections
      const connIds = snapshot.connections.map(c => c.id);
      if (connIds.length > 0) {
        snapshot.messages = await db.select('messages', `connection_id=in.(${connIds.join(',')})`);
      }

      // Fetch collaborative projects matching their school
      snapshot.projects = await db.select('projects', `or=(creator_school_id.eq.${schoolId},target_school_id.eq.${schoolId})`);
      
      const projectIds = snapshot.projects.map(p => p.id);
      if (projectIds.length > 0) {
        const projFilter = `project_id=in.(${projectIds.join(',')})`;
        snapshot.project_slides = await db.select('project_slides', projFilter);
        snapshot.project_messages = await db.select('project_messages', projFilter);
      }

      // Fetch speed exchange sessions hosted or partnered by their school
      snapshot.speed_sessions = await db.select('speed_sessions', `or=(host_school_id.eq.${schoolId},partner_school_id.eq.${schoolId})`);

      // Filter flags and logs connected to their school students/messages/projects
      const allFlags = await db.select('flags');
      const allLogs = await db.select('logs');

      snapshot.flags = allFlags.filter(f => {
        // Flag is related to a school connection message or project
        if (f.message_id) {
          const msg = snapshot.messages.find(m => m.id === f.message_id);
          return !!msg;
        }
        if (f.project_id) {
          const proj = snapshot.projects.find(p => p.id === f.project_id);
          return !!proj;
        }
        return false;
      });

      snapshot.logs = allLogs.filter(l => {
        // Redact logs not involving their school or action types
        return l.actor && (l.actor.includes(schoolId) || l.actor.includes(userId) || l.action.includes(schoolId));
      });

      // Filter news
      const newsSchools = [schoolId, ...Array.from(partnerSchoolIds)];
      const newsFilter = newsSchools.length > 1
        ? `school_id=in.(${newsSchools.join(',')})`
        : `school_id=eq.${schoolId}`;
      snapshot.news = await db.select('news', newsFilter);
    }

    return res.status(200).json(snapshot);
  }

  // DEFAULT: Student Role (Minimize information exposure)
  const studentList = await db.select('students', `id=eq.${userId}`);
  const student = studentList[0];
  if (!student || !student.active) {
    return res.status(403).json({ error: 'Forbidden: Student account is inactive.' });
  }
  const schoolId = student.school_id;

  snapshot.schools = await db.select('schools');

  if (schoolId) {
    // 1. Fetch connections involving this student specifically
    snapshot.connections = await db.select('connections', `or=(student_a_id.eq.${userId},student_b_id.eq.${userId})`);
    
    // 2. Fetch matched partner IDs
    const matchedPartnerIds = snapshot.connections.map(c => 
      c.student_a_id === userId ? c.student_b_id : c.student_a_id
    );

    // 3. Fetch school coordinators (only from own school and partner school matches)
    const partners = await db.select('students', matchedPartnerIds.length > 0 ? `id=in.(${matchedPartnerIds.join(',')})` : `id=eq.${userId}`);
    const partnerSchoolIds = partners.map(p => p.school_id);
    const activeSchools = [schoolId, ...partnerSchoolIds];

    const allCoords = await db.select('coordinators');
    snapshot.coordinators = sanitizeUsers(allCoords.filter(c => activeSchools.includes(c.school_id)));

    // 4. Fetch students (own school classmates + matched partner profiles)
    const studentQuery = matchedPartnerIds.length > 0
      ? `or=(school_id.eq.${schoolId},id.in.(${matchedPartnerIds.join(',')}))`
      : `school_id=eq.${schoolId}`;
    
    snapshot.students = serializeStudentForStudents(await db.select('students', studentQuery), userId);

    // 5. Fetch chat messages inside their active connections
    const connIds = snapshot.connections.map(c => c.id);
    if (connIds.length > 0) {
      snapshot.messages = await db.select('messages', `connection_id=in.(${connIds.join(',')})`);
    }

    // 6. Fetch collaborative projects involving their school
    snapshot.projects = await db.select('projects', `or=(creator_school_id.eq.${schoolId},target_school_id.eq.${schoolId})`);
    
    const projectIds = snapshot.projects.map(p => p.id);
    if (projectIds.length > 0) {
      const projFilter = `project_id=in.(${projectIds.join(',')})`;
      snapshot.project_slides = await db.select('project_slides', projFilter);
      snapshot.project_messages = await db.select('project_messages', projFilter);
    }

    // 7. Fetch speed sessions
    snapshot.speed_sessions = await db.select('speed_sessions', `or=(host_school_id.eq.${schoolId},partner_school_id.eq.${schoolId})`);
    
    // 8. Fetch news (from own school + active partner schools)
    const newsFilter = activeSchools.length > 1
      ? `school_id=in.(${activeSchools.join(',')})`
      : `school_id=eq.${schoolId}`;
    snapshot.news = await db.select('news', newsFilter);
  }

  // Include public Pusher configurations for real-time client subscription
  snapshot.pusher = {
    key: process.env.PUSHER_KEY || '',
    cluster: process.env.PUSHER_CLUSTER || 'eu'
  };

  return res.status(200).json(snapshot);
}

// ----------------- POST SYNC WRITES & VALIDATIONS -----------------
async function handlePostSync(userId, userRole, payload, res, user) {
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'Invalid payload: updates must be an array' });
  }
  const { updates } = payload;
  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'Invalid payload: updates must be an array' });
  }

  // Retrieve user's school boundary
  let userSchoolId = user ? user.school_id : null;

  // Pre-authorize every batch operation before executing any operation (Batch integrity)
  for (const update of updates) {
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ error: 'Invalid update operation' });
    }
    const { action, table, data, match } = update;
    if (action !== 'insert' && action !== 'update' && action !== 'delete') {
      return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    if (action === 'insert' || action === 'update') {
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Invalid or missing data object' });
      }

      // Enforce server-side length limits on all text fields
      for (const key of Object.keys(data)) {
        if (typeof data[key] === 'string' && data[key].length > 5000) {
          return res.status(400).json({ error: `Field ${key} exceeds maximum length limit` });
        }
      }

      // Server-side safeguarding filter for messages
      if (table === 'messages' || table === 'project_messages') {
        const msgText = data.text || data.content || '';
        const check = detectSafeguardingFlag(msgText);
        if (check.flagged) {
          data.flagged = true;
          data.flag_reason = check.reason;
        } else {
          data.flagged = false;
          data.flag_reason = null;
        }
      }
    }

    // Validate write permissions
    const isAuthorized = await validateWritePermission(userId, userRole, userSchoolId, action, table, data, match);
    if (!isAuthorized) {
      return res.status(403).json({ error: `Forbidden: Unauthorized write to table ${table}` });
    }
  }

  const results = [];

  for (const update of updates) {
    const { action, table, data, match } = update;

    let result;
    if (action === 'insert') {
      if (table === 'flags' && data.message_id) {
        const existingFlags = await db.select('flags', `message_id=eq.${data.message_id}`);
        result = existingFlags.length > 0 ? existingFlags[0] : await db.insert(table, data);
      } else {
        result = await db.insert(table, data);
      }

      if (table === 'messages' && data.flagged === true) {
        await ensureSafeguardingAlert(data);
      }
    } else if (action === 'update') {
      if (table === 'project_slides' && userRole === 'student') {
        const nowStr = new Date().toISOString();
        const conditionalMatch = `${match}&or=(locked_by_id.is.null,locked_expires_at.lt.${nowStr},locked_by_id.eq.${userId})`;
        result = await db.update(table, data, conditionalMatch);
        if (!result || result.length === 0) {
          return res.status(409).json({ error: 'Conflict: Slide is locked by another user or session expired' });
        }
      } else {
        result = await db.update(table, data, match);
      }
    } else if (action === 'delete') {
      result = await db.delete(table, match);
    }
    results.push({ success: true, result });

    // Trigger Pusher triggers for real-time broadcasts
    if (action === 'insert' || action === 'update') {
      try {
        if (table === 'messages' && data.connection_id) {
          await pusher.trigger(`chat-${data.connection_id}`, 'new-message', data);
        } else if (table === 'project_messages' && data.project_id) {
          await pusher.trigger(`project-${data.project_id}`, 'new-project-message', data);
        } else if (table === 'project_slides' && data.project_id) {
          await pusher.trigger(`project-${data.project_id}`, 'slide-update', data);
        }
      } catch (pushErr) {
        console.warn("Real-time Pusher trigger failed:", pushErr);
      }
    }
  }

  return res.status(200).json({ success: true, results });
}

async function ensureSafeguardingAlert(message) {
  const existingFlags = await db.select('flags', `message_id=eq.${message.id}`);
  if (existingFlags.length === 0) {
    const suffix = String(message.id).replace(/^msg_/, '');
    await db.insert('flags', {
      id: `flag_${suffix}`,
      message_id: message.id,
      project_id: null,
      status: 'Pending',
      flagged_at: new Date().toISOString(),
      reason: message.flag_reason || 'Safeguarding content detected',
      details: 'Automatically detected in a student message.',
      reported_by: 'System',
      reviewed_by: null,
      reviewed_at: null,
      action_taken: null
    });
  }

  await db.update('connections', { status: 'Paused' }, `id=eq.${message.connection_id}`);

  const existingLogs = await db.select('logs', `id=eq.log_safeguard_${message.id}`);
  if (existingLogs.length === 0) {
    await db.insert('logs', {
      id: `log_safeguard_${message.id}`,
      type: 'Safeguarding Alert',
      action: `Automatic safeguarding alert created for message ${message.id}; conversation paused.`,
      actor: 'System',
      created_at: new Date().toISOString()
    });
  }
}

async function checkFlagAssociation(messageId, projectId, userSchoolId) {
  if (messageId) {
    const msg = await db.select('messages', `id=eq.${messageId}`);
    if (msg.length > 0) {
      const conn = await db.select('connections', `id=eq.${msg[0].connection_id}`);
      if (conn.length > 0) {
        const students = await db.select('students', `id=in.(${conn[0].student_a_id},${conn[0].student_b_id})`);
        return students.some(s => s.school_id === userSchoolId);
      }
    }
  }
  if (projectId) {
    const proj = await db.select('projects', `id=eq.${projectId}`);
    if (proj.length > 0) {
      const conn = await db.select('connections', `id=eq.${proj[0].connection_id}`);
      if (conn.length > 0) {
        const students = await db.select('students', `id=in.(${conn[0].student_a_id},${conn[0].student_b_id})`);
        return students.some(s => s.school_id === userSchoolId);
      }
    }
  }
  return false;
}

// ----------------- AUTHORIZATION ENGINE -----------------
async function validateWritePermission(userId, userRole, userSchoolId, action, table, data, matchStr) {
  if (userRole === 'admin') {
    return true; // Admin holds root credentials
  }

  const match = parseMatch(matchStr || '');

  // 1. SCHOOLS
  if (table === 'schools') {
    if (action === 'update' && (userRole === 'teacher' || userRole === 'coordinator') && match.id === userSchoolId) {
      if (data && data.hasOwnProperty('id')) {
        return false;
      }
      return true; // Coordinators can modify their own school profile details
    }
    return false;
  }

  // 2. COORDINATORS
  if (table === 'coordinators') {
    if (action === 'update' && match.id === userId) {
      // Can only update own safe profile fields. Block updates to system/security/matching fields.
      const allowedFields = ['name', 'bio', 'languagesSpoken', 'interests', 'subjects'];
      const updateFields = Object.keys(data);
      const isAllowed = updateFields.every(field => allowedFields.includes(field));
      if (!isAllowed) {
        return false;
      }
      return true;
    }
    return false;
  }

  // 3. STUDENTS
  if (table === 'students') {
    if (userRole === 'teacher' || userRole === 'coordinator') {
      if (action === 'insert') {
        return data.school_id === userSchoolId; // Teachers only insert students at their school
      }
      if (action === 'update') {
        const targetStudent = await db.select('students', `id=eq.${match.id}`);
        if (targetStudent.length === 0 || targetStudent[0].school_id !== userSchoolId) {
          return false;
        }
        if (data && (
          data.hasOwnProperty('password_hash') ||
          data.hasOwnProperty('school_id') ||
          data.hasOwnProperty('id') ||
          data.hasOwnProperty('email') ||
          data.hasOwnProperty('active')
        )) {
          return false;
        }
        return true;
      }
      if (action === 'delete') {
        const targetStudent = await db.select('students', `id=eq.${match.id}`);
        return targetStudent.length > 0 && targetStudent[0].school_id === userSchoolId;
      }
    } else if (userRole === 'student') {
      if (action === 'update' && match.id === userId) {
        // Students can only update own safe profile fields. Block updates to system/security/matching fields.
        const allowedStudentFields = ['name', 'bio', 'languagesSpoken', 'interests', 'subjects', 'photoUrl', 'language'];
        const updateFields = Object.keys(data);
        const isAllowed = updateFields.every(field => allowedStudentFields.includes(field));
        if (!isAllowed) {
          return false;
        }
        return true;
      }
    }
    return false;
  }

  // 4. CONNECTIONS
  if (table === 'connections') {
    if (userRole === 'teacher' || userRole === 'coordinator') {
      // Must verify at least one of the students in the connection is at their school
      if (action === 'insert') {
        const studA = await db.select('students', `id=eq.${data.student_a_id}`);
        const studB = await db.select('students', `id=eq.${data.student_b_id}`);
        return (studA.length > 0 && studA[0].school_id === userSchoolId) ||
               (studB.length > 0 && studB[0].school_id === userSchoolId);
      }
      if (action === 'update' || action === 'delete') {
        const conn = await db.select('connections', `id=eq.${match.id}`);
        if (conn.length === 0) return false;
        if (action === 'update' && data && (data.hasOwnProperty('student_a_id') || data.hasOwnProperty('student_b_id') || data.hasOwnProperty('id'))) {
          return false;
        }
        const studA = await db.select('students', `id=eq.${conn[0].student_a_id}`);
        const studB = await db.select('students', `id=eq.${conn[0].student_b_id}`);
        return (studA.length > 0 && studA[0].school_id === userSchoolId) ||
               (studB.length > 0 && studB[0].school_id === userSchoolId);
      }
    }
    return false;
  }

  // 5. MESSAGES
  if (table === 'messages') {
    if (userRole === 'student') {
      if (action === 'insert') {
        // Verify message is sent by self
        if (data.sender_id !== userId) return false;
        // Verify active connection involves the sender student
        const conn = await db.select('connections', `id=eq.${data.connection_id}`);
        return conn.length > 0 && 
               conn[0].status === 'Active' &&
               (conn[0].student_a_id === userId || conn[0].student_b_id === userId);
      }
    } else if (userRole === 'teacher' || userRole === 'coordinator') {
      // Teachers can delete messages within their connections
      if (action === 'delete') {
        const msg = await db.select('messages', `id=eq.${match.id}`);
        if (msg.length === 0) return false;
        const conn = await db.select('connections', `id=eq.${msg[0].connection_id}`);
        if (conn.length === 0) return false;
        const studA = await db.select('students', `id=eq.${conn[0].student_a_id}`);
        const studB = await db.select('students', `id=eq.${conn[0].student_b_id}`);
        return (studA.length > 0 && studA[0].school_id === userSchoolId) ||
               (studB.length > 0 && studB[0].school_id === userSchoolId);
      }
    }
    return false;
  }

  // 6. PROJECTS
  if (table === 'projects') {
    if (userRole === 'teacher' || userRole === 'coordinator') {
      if (action === 'insert') {
        return data.creator_school_id === userSchoolId;
      }
      if (action === 'update' || action === 'delete') {
        const proj = await db.select('projects', `id=eq.${match.id}`);
        if (proj.length === 0) return false;
        if (action === 'update' && data && (data.hasOwnProperty('creator_school_id') || data.hasOwnProperty('id'))) {
          return false;
        }
        return proj[0].creator_school_id === userSchoolId;
      }
    }
    return false;
  }

  // 7. PROJECT_SLIDES
  if (table === 'project_slides') {
    if (action === 'insert') {
      const targetProjId = data.project_id;
      if (!targetProjId) return false;
      const proj = await db.select('projects', `id=eq.${targetProjId}`);
      if (proj.length === 0) return false;
      const isParticipant = proj[0].creator_school_id === userSchoolId || proj[0].target_school_id === userSchoolId;
      if (!isParticipant) return false;

      if (userRole === 'student') {
        const student = await db.select('students', `id=eq.${userId}`);
        if (student.length === 0) return false;
        const expectedAuthor = `${student[0].name}|${userId}`;
        if (data.author !== expectedAuthor && data.author !== student[0].name) {
          return false;
        }
      }
      return true;
    }
    
    if (action === 'update' || action === 'delete') {
      const slides = await db.select('project_slides', `id=eq.${match.id}`);
      if (slides.length === 0) return false;
      const existingSlide = slides[0];
      
      const proj = await db.select('projects', `id=eq.${existingSlide.project_id}`);
      if (proj.length === 0) return false;
      
      const isParticipant = proj[0].creator_school_id === userSchoolId || proj[0].target_school_id === userSchoolId;
      if (!isParticipant) return false;
      
      if (userRole === 'student') {
        const student = await db.select('students', `id=eq.${userId}`);
        if (student.length === 0) return false;
        const studentName = student[0].name;

        // Secure student slide authorship using immutable student ID format Name|Id
        let isAuthor = false;
        if (existingSlide.author) {
          if (existingSlide.author.includes('|')) {
            isAuthor = existingSlide.author.split('|')[1] === userId;
          } else {
            const trimmed = existingSlide.author.trim();
            let authorId = null;
            if (trimmed === 'Harriet Potter') authorId = 'stud_1';
            else if (trimmed === 'Emily Watson') authorId = 'stud_2';
            else if (trimmed === 'Lukas Schmidt') authorId = 'stud_7';
            
            if (authorId) {
              isAuthor = authorId === userId;
            } else {
              isAuthor = trimmed === studentName;
            }
          }
        }

        if (action === 'delete') {
          return isAuthor;
        }

        if (action === 'update') {
          // Block changing slide id or project_id to prevent moving slide to other projects
          if (data.hasOwnProperty('id') || data.hasOwnProperty('project_id')) {
            return false;
          }

          // If student is managing lock properties
          if (data.hasOwnProperty('locked_by_id') || data.hasOwnProperty('locked_by_name')) {
            if (data.locked_by_id) {
              // Lock acquisition: force server-side resolved ID and name
              data.locked_by_id = userId;
              data.locked_by_name = studentName;
            } else {
              // Lock release: must be current owner or lock must be expired
              const currentOwner = existingSlide.locked_by_id;
              const hasActiveLock = existingSlide.locked_by_id &&
                                    existingSlide.locked_expires_at &&
                                    new Date(existingSlide.locked_expires_at) > new Date();
              if (hasActiveLock && currentOwner !== userId) {
                return false; // Cannot release someone else's active lock
              }
              data.locked_by_id = null;
              data.locked_by_name = null;
              data.locked_expires_at = null;
            }
          }

          // Lock constraint: if slide is not editable by others and student is not the author, block update
          if (existingSlide.editable_by_others === false && !isAuthor) {
            return false;
          }
          
          // Students cannot change the author field or lock setting of a slide they didn't write
          if (!isAuthor) {
            if (data.hasOwnProperty('author') && data.author !== existingSlide.author) {
              return false;
            }
            if (data.hasOwnProperty('editable_by_others') && data.editable_by_others !== existingSlide.editable_by_others) {
              return false;
            }
          }

          // If the author field is actually being changed, it must resolve to self.
          // Browser write-through updates include the unchanged author on every
          // slide patch, including edits made by collaborators.
          if (data.hasOwnProperty('author') &&
              data.author !== existingSlide.author &&
              data.author !== `${studentName}|${userId}` &&
              data.author !== studentName) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  // 8. PROJECT_MESSAGES
  if (table === 'project_messages') {
    if (userRole === 'student' && action === 'insert') {
      if (data.sender_id !== userId) return false;
      const proj = await db.select('projects', `id=eq.${data.project_id}`);
      return proj.length > 0 && (proj[0].creator_school_id === userSchoolId || proj[0].target_school_id === userSchoolId);
    }
    if ((userRole === 'teacher' || userRole === 'coordinator') && action === 'delete') {
      const msg = await db.select('project_messages', `id=eq.${match.id}`);
      if (msg.length === 0) return false;
      const proj = await db.select('projects', `id=eq.${msg[0].project_id}`);
      return proj.length > 0 && (proj[0].creator_school_id === userSchoolId || proj[0].target_school_id === userSchoolId);
    }
    return false;
  }

  // 9. NEWS
  if (table === 'news') {
    if (userRole === 'teacher' || userRole === 'coordinator') {
      if (action === 'insert') {
        return data.school_id === userSchoolId;
      }
      if (action === 'update' || action === 'delete') {
        const newsItem = await db.select('news', `id=eq.${match.id}`);
        if (newsItem.length === 0) return false;
        if (action === 'update' && data && (data.hasOwnProperty('school_id') || data.hasOwnProperty('id'))) {
          return false;
        }
        return newsItem[0].school_id === userSchoolId;
      }
    }
    return false;
  }

  // 10. FLAGS
  if (table === 'flags') {
    if (userRole === 'teacher' || userRole === 'coordinator') {
      if (action === 'insert') {
        return await checkFlagAssociation(data.message_id, data.project_id, userSchoolId);
      }
      if (action === 'update') {
        const targetFlag = await db.select('flags', `id=eq.${match.id}`);
        if (targetFlag.length === 0) return false;
        const isAssocOk = await checkFlagAssociation(targetFlag[0].message_id, targetFlag[0].project_id, userSchoolId);
        if (!isAssocOk) return false;
        
        // Block changing metadata and associations
        if (
          data.hasOwnProperty('id') ||
          data.hasOwnProperty('message_id') ||
          data.hasOwnProperty('project_id') ||
          data.hasOwnProperty('reported_by') ||
          data.hasOwnProperty('flagged_at')
        ) {
          return false;
        }
        
        // Prevent forging reviewer identity
        const coord = await db.select('coordinators', `id=eq.${userId}`);
        if (coord.length === 0) return false;
        const coordName = coord[0].name;

        if (data.hasOwnProperty('reviewed_by') && data.reviewed_by !== coordName) {
          return false;
        }

        if (data.status === 'Resolved' || data.resolved === true) {
          data.reviewed_by = coordName;
          data.reviewed_at = new Date().toISOString();
        }
        return true;
      }
      if (action === 'delete') {
        const targetFlag = await db.select('flags', `id=eq.${match.id}`);
        if (targetFlag.length === 0) return false;
        return await checkFlagAssociation(targetFlag[0].message_id, targetFlag[0].project_id, userSchoolId);
      }
      return false;
    }
    if (userRole === 'student' && action === 'insert') {
      // Students can report/flag messages in their connections
      if (data.message_id) {
        const msg = await db.select('messages', `id=eq.${data.message_id}`);
        if (msg.length === 0) return false;
        const conn = await db.select('connections', `id=eq.${msg[0].connection_id}`);
        return conn.length > 0 && (conn[0].student_a_id === userId || conn[0].student_b_id === userId);
      }
    }
    return false;
  }

  // 11. SPEED_SESSIONS
  if (table === 'speed_sessions') {
    if (userRole === 'teacher' || userRole === 'coordinator') {
      if (action === 'insert') {
        return data.host_school_id === userSchoolId;
      }
      if (action === 'update' || action === 'delete') {
        const sess = await db.select('speed_sessions', `id=eq.${match.id}`);
        if (sess.length === 0 || sess[0].host_school_id !== userSchoolId) {
          return false;
        }
        if (action === 'update') {
          if (
            data.hasOwnProperty('id') ||
            data.hasOwnProperty('host_school_id') ||
            data.hasOwnProperty('partner_school_id')
          ) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  // 12. LOGS
  if (table === 'logs') {
    if (action === 'insert' && (userRole === 'teacher' || userRole === 'coordinator')) {
      // Teachers can only log as themselves or generic teacher roles. Enforce no forging system/admin logs.
      const actorLower = (data.actor || '').toLowerCase();
      if (actorLower.includes('system') || actorLower.includes('admin') || actorLower.includes('audit')) {
        return false;
      }
      return true;
    }
    return false;
  }

  return false;
}
