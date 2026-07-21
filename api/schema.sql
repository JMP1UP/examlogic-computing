-- Bridge PostgreSQL Database Schema Creation Script

-- Clean up existing tables
DROP TABLE IF EXISTS invitations CASCADE;
DROP TABLE IF EXISTS school_requests CASCADE;
DROP TABLE IF EXISTS flags CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS logs CASCADE;
DROP TABLE IF EXISTS speed_sessions CASCADE;
DROP TABLE IF EXISTS project_messages CASCADE;
DROP TABLE IF EXISTS project_slides CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS connections CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS coordinators CASCADE;
DROP TABLE IF EXISTS schools CASCADE;

-- 1. Schools Table
CREATE TABLE schools (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  logo_url TEXT,
  description TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. Coordinators (Teachers / Admin Staff)
CREATE TABLE coordinators (
  id VARCHAR(100) PRIMARY KEY,
  school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'Coordinator' CHECK (role IN ('Coordinator', 'Admin')) NOT NULL,
  approved BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Students
CREATE TABLE students (
  id VARCHAR(100) PRIMARY KEY,
  school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  year_group VARCHAR(50) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  interests TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  bio TEXT,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. Student Connections (1-to-1 Matches)
CREATE TABLE connections (
  id VARCHAR(100) PRIMARY KEY,
  student_a_id VARCHAR(100) REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  student_b_id VARCHAR(100) REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Paused', 'Disbanded')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT unique_student_pair UNIQUE(student_a_id, student_b_id)
);

-- 5. Chat Messages (1-to-1 Chat logs)
CREATE TABLE messages (
  id VARCHAR(100) PRIMARY KEY,
  connection_id VARCHAR(100) REFERENCES connections(id) ON DELETE CASCADE NOT NULL,
  sender_id VARCHAR(100) REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  translation TEXT,
  flagged BOOLEAN DEFAULT FALSE NOT NULL,
  flag_reason TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. Collaborative Group Projects
CREATE TABLE projects (
  id VARCHAR(100) PRIMARY KEY,
  creator_school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  target_school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Proposed', 'PendingPublish', 'Published', 'Cancelled')) NOT NULL,
  title VARCHAR(255) NOT NULL,
  brief TEXT NOT NULL,
  paused BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 7. Collaborative Project Slides
CREATE TABLE project_slides (
  id VARCHAR(100) PRIMARY KEY,
  project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  slide_index INT NOT NULL,
  layout VARCHAR(50) DEFAULT 'split' CHECK (layout IN ('split', 'text-only')) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  photo_url TEXT,
  author VARCHAR(255) NOT NULL,
  editable_by_others BOOLEAN DEFAULT TRUE NOT NULL,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  locked_by_id VARCHAR(100) REFERENCES students(id) ON DELETE SET NULL,
  locked_by_name VARCHAR(255),
  locked_expires_at TIMESTAMP,
  CONSTRAINT unique_project_slide_index UNIQUE(project_id, slide_index)
);

-- 8. Project Group Chat Messages
CREATE TABLE project_messages (
  id VARCHAR(100) PRIMARY KEY,
  project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  sender_id VARCHAR(100) REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. Speed Exchange Live Sessions
CREATE TABLE speed_sessions (
  id VARCHAR(100) PRIMARY KEY,
  host_school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  partner_school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) DEFAULT 'lobby' CHECK (status IN ('lobby', 'active', 'ended')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 10. Audit logs (GDPR & Safeguarding Auditing)
CREATE TABLE logs (
  id VARCHAR(100) PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  action TEXT NOT NULL,
  actor VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 11. Safeguarding Flags Table
CREATE TABLE flags (
  id VARCHAR(100) PRIMARY KEY,
  message_id VARCHAR(100) REFERENCES messages(id) ON DELETE CASCADE,
  project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved')) NOT NULL,
  flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  reason TEXT,
  details TEXT,
  reported_by VARCHAR(255),
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMP,
  action_taken TEXT
);

-- 12. School News Table
CREATE TABLE news (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  posted_by VARCHAR(255) NOT NULL,
  school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- 13. School Onboarding Requests Table
CREATE TABLE school_requests (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  language VARCHAR(10) DEFAULT 'en' NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  coordinator_name VARCHAR(255) NOT NULL,
  coordinator_email VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Declined')) NOT NULL,
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 14. School Coordinator Invitations Table
CREATE TABLE invitations (
  id VARCHAR(100) PRIMARY KEY,
  school_id VARCHAR(100) REFERENCES schools(id) ON DELETE CASCADE,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  language VARCHAR(10) DEFAULT 'en' NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'generated' CHECK (status IN ('generated', 'sent', 'accepted', 'expired', 'revoked')) NOT NULL,
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  accepted_at TIMESTAMP
);

-- Add lead coordinator reference and onboarding status to schools
ALTER TABLE schools ADD COLUMN IF NOT EXISTS lead_coordinator_id VARCHAR(100);
ALTER TABLE schools ADD COLUMN IF NOT EXISTS onboarding_status VARCHAR(50) DEFAULT 'not_invited' CHECK (onboarding_status IN ('not_invited', 'invite_generated', 'invited', 'activated', 'active', 'on_hold')) NOT NULL;
