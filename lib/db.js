// Shared DB helper wrapping Supabase PostgREST API queries into simple promise-based REST helpers.
// If Supabase environment variables are missing, this fallback automatically runs in
// a mock/demo in-memory database mode, pre-populated with default seed data.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isProduction = process.env.VERCEL_ENV === 'production';
const isMockMode = process.env.ENABLE_MOCK_DB === 'true';

if ((!SUPABASE_URL || !SUPABASE_KEY) && !isMockMode) {
  throw new Error('Database configuration is missing');
}

if (isProduction && isMockMode) {
  throw new Error('Mock database must not run in production');
}

if (isMockMode) {
  console.warn("ENABLE_MOCK_DB is active. Running in local mock/demo mode.");
}

// In-memory mock database storage initialized with seed data
let mockStore = {
  schools: [
    { id: 'school_1', name: 'Leicester High School', city: 'Leicester', country: 'United Kingdom', logo_url: '/assets/leicester_logo.jpg', description: 'Leicester High School is an independent girls\' school located in Leicester, UK. Established in 1906, we provide a warm nurturing environment.', photo_url: '/assets/leicester_campus.jpg', created_at: new Date().toISOString() },
    { id: 'school_2', name: 'Goethe-Gymnasium', city: 'Munich', country: 'Germany', logo_url: '/assets/goethe_logo.png', description: 'Goethe-Gymnasium is a mixed, state-supported academic high school (Gymnasium) located in Munich, Germany. We focus on modern languages.', photo_url: '/assets/goethe_campus.png', created_at: new Date().toISOString() },
    { id: 'school_3', name: 'Lycée Saint-Exupéry', city: 'Lyon', country: 'France', logo_url: '', description: 'Lycée Saint-Exupéry is a historic high school in Lyon, France. We specialize in international studies, literature, and art history.', photo_url: '', created_at: new Date().toISOString() }
  ],
  coordinators: [
    { id: 'coord_1', school_id: 'school_1', name: 'Mrs. Smith', email: 'smith@leicesterhigh.edu', password_hash: '15377d24b9cf70faf35025f65a722f93:bfc80d63b4e7992f17cb4dc9b8cc432d73b36c5d03e8f61830be5f456fc933c8ca97f306a09a74508c7e2acc637482340e17a9cb511541f05603dcad8277cec6', role: 'Coordinator', approved: true, created_at: new Date().toISOString() },
    { id: 'coord_2', school_id: 'school_2', name: 'Herr Wagner', email: 'wagner@goethe.edu', password_hash: 'f4079a08ef4477824b55e081e449a870:06997dcf3ebe6b06c1f76fe142042ded361145b4d48abd473effde69035c58e54f9050156eb7df715d9da59d5ab510dc4913cccd9670ea2982307aaafcd4f549', role: 'Coordinator', approved: true, created_at: new Date().toISOString() },
    { id: 'coord_3', school_id: 'school_3', name: 'M. Dupont', email: 'dupont@lycee.edu', password_hash: '1184ad27481cd4ef81dc6d1dd257e7b6:fc1e54976db6a0819c5f5f3f7f934fb2cc58f0a32a74192a9a9cc56756a5fefd406bd9201a7aa82bfdab1027d22bd21cefdcdd9bf221906da1725254c13f9841', role: 'Coordinator', approved: true, created_at: new Date().toISOString() },
    { id: 'coord_999', school_id: 'school_1', name: 'System Admin', email: 'john@25Thirty.com', password_hash: 'e9aa5e486ab5196919f22c89f7c3211d:d3b1d80b42c24cbcd7feec8c1e91a49fd5b3874f79fd5854c4118c595a3e44418d0e4ae70de8301a3b2ec5f1546bda0282b6cda795e57fb5dce1caab6950f849', role: 'Admin', approved: true, created_at: new Date().toISOString() }
  ],
  students: [
    { id: 'stud_1', school_id: 'school_1', name: 'Harriet Potter', email: 'harriet@leicesterhigh.edu', password_hash: '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', year_group: 'Year 9', gender: 'Female', interests: ['drawing', 'tennis', 'languages'], bio: 'Hi! I am Harriet. I love drawing, playing tennis, and learning languages.', active: true, created_at: new Date().toISOString() },
    { id: 'stud_2', school_id: 'school_1', name: 'Emily Watson', email: 'emily@leicesterhigh.edu', password_hash: '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', year_group: 'Year 8', gender: 'Female', interests: ['baking', 'reading'], bio: 'I love baking chocolate chip cookies and reading mystery novels.', active: true, created_at: new Date().toISOString() },
    { id: 'stud_7', school_id: 'school_2', name: 'Lukas Schmidt', email: 'lukas@goethe.edu', password_hash: '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', year_group: 'Klasse 9', gender: 'Male', interests: ['football', 'minecraft'], bio: 'Hallo! Ich bin Lukas. Ich spiele gerne Fußball und zocke Minecraft.', active: true, created_at: new Date().toISOString() },
    { id: 'stud_8', school_id: 'school_2', name: 'Hanna Müller', email: 'hanna@goethe.edu', password_hash: '1fdeff5b3955c36239dd1ae351d2bdc5:9363a609f66265b188f2f78370d562e4c803cce88006c9bcb491725686680fb3ff316e8c1714c53f1ae1f1f6b324cc529dba7915c19949484a6d7563a7099aa0', year_group: 'Klasse 8', gender: 'Female', interests: [], bio: '', active: true, created_at: new Date().toISOString() }
  ],
  connections: [
    { id: 'match_1', student_a_id: 'stud_1', student_b_id: 'stud_7', status: 'Active', created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString() },
    { id: 'match_2', student_a_id: 'stud_2', student_b_id: 'stud_8', status: 'Active', created_at: new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString() }
  ],
  messages: [
    { id: 'msg_1', connection_id: 'match_1', sender_id: 'stud_1', text: 'Hello Lukas! I am Harriet from Leicester. I am excited to be your pen pal. Do you like football?', translation: 'Hallo Lukas! Ich bin Harriet aus Leicester. Ich freue mich, deine Brieffreundin zu sein. Magst du Fußball?', flagged: false, flag_reason: null, timestamp: new Date(Date.now() - 29 * 24 * 3600 * 1000).toISOString() },
    { id: 'msg_2', connection_id: 'match_1', sender_id: 'stud_7', text: 'Hallo Harriet! Yes, I love football. I support Bayern Munich. What about you?', translation: 'Hallo Harriet! Ja, ich liebe Fußball. Ich unterstütze Bayern München. Und du?', flagged: false, flag_reason: null, timestamp: new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString() }
  ],
  projects: [
    { id: 'proj_1', creator_school_id: 'school_1', target_school_id: 'school_2', status: 'Active', title: 'Our Cultural Traditions', brief: 'Compare and write about the traditional foods and celebrations in our countries.', paused: false, created_at: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString() }
  ],
  project_slides: [
    { id: 'slide_1', project_id: 'proj_1', slide_index: 0, layout: 'split', title: 'A Taste of Two Cultures', content: 'In this project, we explore the rich traditions of afternoon tea in England and traditional Brezeln in Bavaria.', photo_url: '', author: 'Harriet Potter', editable_by_others: true },
    { id: 'slide_2', project_id: 'proj_1', slide_index: 1, layout: 'split', title: 'English Afternoon Tea', content: 'Afternoon tea is a light meal typically eaten between 4 PM and 6 PM. It consists of tea served with milk, sandwich fingers, and warm scones.', photo_url: '/assets/afternoon_tea.png', author: 'Emily Watson', editable_by_others: true },
    { id: 'slide_3', project_id: 'proj_1', slide_index: 2, layout: 'split', title: 'Bavarian Soft Pretzels', content: 'Brezeln are a traditional type of baked bread product shaped into a knot. They are dipped in lye before baking.', photo_url: '/assets/brezeln.png', author: 'Lukas Schmidt', editable_by_others: true }
  ],
  news: [
    { id: 'news_1', title: 'Welcome to the 2026 Exchange!', content: 'We are thrilled to launch this exchange program between Leicester High School and Goethe-Gymnasium.', posted_by: 'Teacher Mrs. Smith', school_id: 'school_1', timestamp: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString() }
  ],
  flags: [
    { id: 'flag_1', message_id: 'msg_1', project_id: null, status: 'Pending', flagged_at: new Date(Date.now() - 11 * 24 * 3600 * 1000).toISOString(), reason: 'Flagged automatically for sensitive content.', details: 'Message contains keywords.', reported_by: 'System', reviewed_by: null, reviewed_at: null, action_taken: null }
  ],
  logs: [
    { id: 'log_1', type: 'System Action', action: 'Match Created: Harriet Potter matched with Lukas Schmidt.', actor: 'Teacher Mrs. Smith', created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString() }
  ],
  school_requests: [],
  school_domains: [
    { id: 'dom_1', school_id: 'school_1', domain: 'leicesterhigh.edu', is_primary: true, verified_at: new Date().toISOString(), created_at: new Date().toISOString() },
    { id: 'dom_2', school_id: 'school_2', domain: 'goethe.edu', is_primary: true, verified_at: new Date().toISOString(), created_at: new Date().toISOString() },
    { id: 'dom_3', school_id: 'school_3', domain: 'lycee.edu', is_primary: true, verified_at: new Date().toISOString(), created_at: new Date().toISOString() }
  ],
  identity_providers: [
    { id: 'idp_ms', school_id: 'school_1', provider: 'microsoft', display_name: 'Leicester High Microsoft account', tenant_identifier: '89b66541-893d-4f1a-926d-17941da298a1', client_id: '4e6aeb58-0d43-43d1-81c4-e6082b4fc077', enabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'idp_pwd', school_id: 'school_1', provider: 'password', display_name: 'ExamLogic pilot account', enabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]
};

// Simple query parser for in-memory tables
function filterMockTable(table, queryString) {
  let list = mockStore[table] || [];
  if (!queryString || queryString === 'select=*') return list;

  const parts = queryString.split('&');
  for (const part of parts) {
    if (part.startsWith('select=')) continue;
    const match = part.match(/^([^=]+)=([^.]+)\.(.+)$/);
    if (match) {
      const field = match[1];
      const op = match[2];
      const val = decodeURIComponent(match[3]);

      list = list.filter(row => {
        const rowVal = String(row[field] || '');
        if (op === 'eq') {
          return rowVal.toLowerCase() === val.toLowerCase();
        } else if (op === 'gte') {
          return rowVal >= val;
        } else if (op === 'lte') {
          return rowVal <= val;
        }
        return true;
      });
    }
  }
  return list;
}

async function request(path, options = {}) {
  if (isMockMode) {
    throw new Error('Supabase environment variables are not configured');
  }

  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${path}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errText = await response.text();
    let errJson;
    try { errJson = JSON.parse(errText); } catch (e) {}
    throw new Error(errJson?.message || errJson?.details || errText || `HTTP Error ${response.status}`);
  }

  if (response.status === 204) return null;

  return await response.json();
}

const db = {
  async select(table, queryString = 'select=*') {
    if (isMockMode) {
      // Map naming conventions from PostgreSQL plural table names if needed
      let storeName = table;
      if (table === 'schoolRequests') storeName = 'school_requests';
      return filterMockTable(storeName, queryString);
    }
    const separator = queryString.includes('select=') ? '' : 'select=*&';
    return await request(`${table}?${separator}${queryString}`, {
      method: 'GET'
    });
  },

  async insert(table, data) {
    if (isMockMode) {
      let storeName = table;
      if (table === 'schoolRequests') storeName = 'school_requests';
      if (!mockStore[storeName]) mockStore[storeName] = [];
      const newRow = { ...data };
      if (!newRow.id) {
        newRow.id = 'mock_' + Math.random().toString(36).substring(2, 9);
      }
      if (!newRow.created_at) {
        newRow.created_at = new Date().toISOString();
      }
      mockStore[storeName].push(newRow);
      return newRow;
    }
    const result = await request(table, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return Array.isArray(result) ? result[0] : result;
  },

  async update(table, data, matchQueryString) {
    if (isMockMode) {
      let storeName = table;
      if (table === 'schoolRequests') storeName = 'school_requests';
      let list = mockStore[storeName] || [];
      const parts = matchQueryString.split('&');
      const updatedRows = [];
      list.forEach(row => {
        let matchesAll = true;
        for (const part of parts) {
          if (part.startsWith('or=')) {
            const orBody = part.substring(4, part.length - 1);
            const conditions = orBody.split(',');
            let matchesOr = false;
            for (const cond of conditions) {
              const dots = cond.split('.');
              const field = dots[0];
              const operator = dots[1];
              const value = dots.slice(2).join('.');
              if (operator === 'is' && value === 'null') {
                if (row[field] === null || row[field] === undefined) {
                  matchesOr = true;
                  break;
                }
              } else if (operator === 'eq') {
                if (String(row[field] || '').toLowerCase() === String(value || '').toLowerCase()) {
                  matchesOr = true;
                  break;
                }
              } else if (operator === 'lt') {
                if (row[field] && new Date(row[field]) < new Date(value)) {
                  matchesOr = true;
                  break;
                }
              }
            }
            if (!matchesOr) {
              matchesAll = false;
              break;
            }
          } else {
            const match = part.match(/^([^=]+)=eq\.(.+)$/);
            if (match) {
              const field = match[1];
              const val = decodeURIComponent(match[2]);
              if (String(row[field] || '').toLowerCase() !== val.toLowerCase()) {
                matchesAll = false;
                break;
              }
            } else {
              matchesAll = false;
              break;
            }
          }
        }
        if (matchesAll) {
          Object.assign(row, data);
          updatedRows.push(row);
        }
      });
      return updatedRows;
    }
    if (!matchQueryString) throw new Error('Update queries require a match constraint');
    return await request(`${table}?${matchQueryString}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  async delete(table, matchQueryString) {
    if (isMockMode) {
      let storeName = table;
      if (table === 'schoolRequests') storeName = 'school_requests';
      let list = mockStore[storeName] || [];
      const match = matchQueryString.match(/^([^=]+)=eq\.(.+)$/);
      if (match) {
        const field = match[1];
        const val = decodeURIComponent(match[2]);
        mockStore[storeName] = list.filter(row => String(row[field] || '').toLowerCase() !== val.toLowerCase());
      }
      return null;
    }
    if (!matchQueryString) throw new Error('Delete queries require a match constraint');
    return await request(`${table}?${matchQueryString}`, {
      method: 'DELETE'
    });
  },

  async rpc(functionName, args = {}) {
    if (isMockMode) {
      return [];
    }
    return await request(`rpc/${functionName}`, {
      method: 'POST',
      body: JSON.stringify(args)
    });
  },
  isMockMode
};

module.exports = db;
