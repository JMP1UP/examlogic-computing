-- StudySpice Computing core schema.
-- Serverless API routes access these tables with the Supabase service-role key.
-- Browser clients receive no direct table access.

create extension if not exists pgcrypto;

create table if not exists public.schools (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  city text,
  country text not null default 'United Kingdom',
  domain text,
  tenant_id text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.coordinators (
  id text primary key default gen_random_uuid()::text,
  school_id text references public.schools(id) on delete restrict,
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'Teacher'
    check (role in ('Teacher', 'Coordinator', 'Admin')),
  approved boolean not null default false,
  bio text,
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.classes (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schools(id) on delete cascade,
  teacher_id text not null references public.coordinators(id) on delete restrict,
  name text not null,
  academic_year text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, name, academic_year)
);

create table if not exists public.students (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schools(id) on delete restrict,
  class_id text references public.classes(id) on delete set null,
  name text not null,
  email text not null unique,
  password_hash text not null,
  year_group text not null,
  active boolean not null default true,
  streak integer not null default 0 check (streak >= 0),
  achievements jsonb not null default '[]'::jsonb,
  personal_revision_priorities jsonb not null default '[]'::jsonb,
  support_level text not null default 'standard'
    check (support_level in ('guided', 'standard', 'stretch')),
  target_grade smallint check (target_grade between 1 and 9),
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignments (
  id text primary key default gen_random_uuid()::text,
  class_id text not null references public.classes(id) on delete cascade,
  created_by text not null references public.coordinators(id) on delete restrict,
  title text not null,
  topic_id text,
  due_date date,
  status text not null default 'Recommended'
    check (status in ('Draft', 'Recommended', 'Required', 'Closed')),
  estimated_minutes integer not null default 10
    check (estimated_minutes between 1 and 180),
  recipient_type text not null default 'class'
    check (recipient_type in ('class', 'students')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignment_recipients (
  assignment_id text not null references public.assignments(id) on delete cascade,
  student_id text not null references public.students(id) on delete cascade,
  primary key (assignment_id, student_id)
);

create table if not exists public.test_preps (
  id text primary key default gen_random_uuid()::text,
  class_id text not null references public.classes(id) on delete cascade,
  created_by text not null references public.coordinators(id) on delete restrict,
  title text not null,
  test_date date not null,
  weekly_minutes integer not null default 20 check (weekly_minutes between 5 and 300),
  session_minutes integer not null default 10 check (session_minutes between 5 and 90),
  status text not null default 'Active'
    check (status in ('Draft', 'Active', 'Completed', 'Archived')),
  specification_point_ids jsonb not null default '[]'::jsonb,
  include_python boolean not null default false,
  include_pseudocode boolean not null default false,
  recipient_type text not null default 'class'
    check (recipient_type in ('class', 'students')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.test_prep_recipients (
  test_prep_id text not null references public.test_preps(id) on delete cascade,
  student_id text not null references public.students(id) on delete cascade,
  primary key (test_prep_id, student_id)
);

create table if not exists public.support_sessions (
  id text primary key default gen_random_uuid()::text,
  class_id text not null references public.classes(id) on delete cascade,
  created_by text not null references public.coordinators(id) on delete restrict,
  title text not null,
  session_type text not null default 'Revision',
  session_date date not null,
  start_time time,
  duration_minutes integer not null default 30
    check (duration_minutes between 5 and 180),
  location text,
  notes text,
  recipient_type text not null default 'students'
    check (recipient_type in ('class', 'students')),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_session_recipients (
  support_session_id text not null references public.support_sessions(id) on delete cascade,
  student_id text not null references public.students(id) on delete cascade,
  primary key (support_session_id, student_id)
);

create table if not exists public.attempts (
  id text primary key default gen_random_uuid()::text,
  student_id text not null references public.students(id) on delete cascade,
  attempt_type text not null,
  topic text,
  question_id text,
  score text,
  support_steps_used integer not null default 0 check (support_steps_used >= 0),
  confidence smallint check (confidence between 1 and 5),
  evidence jsonb not null default '{}'::jsonb,
  attempted_at timestamptz not null default now()
);

create table if not exists public.programming_submissions (
  id text primary key default gen_random_uuid()::text,
  student_id text not null references public.students(id) on delete cascade,
  challenge_id text not null,
  language text not null default 'python'
    check (language in ('python', 'pseudocode')),
  code text not null,
  status text not null default 'Submitted'
    check (status in ('Submitted', 'Passed', 'Needs review', 'Reviewed')),
  support_used text not null default 'None'
    check (support_used in ('None', 'Low', 'Medium', 'High')),
  explanation_response text,
  test_evidence jsonb not null default '[]'::jsonb,
  ai_teacher_summary text,
  teacher_feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.written_submissions (
  id text primary key default gen_random_uuid()::text,
  student_id text not null references public.students(id) on delete cascade,
  question_id text not null,
  response text not null,
  planning_scaffold_used boolean not null default false,
  estimated_mark text,
  strengths text,
  improvements text,
  action_item text,
  feedback_source text,
  status text not null default 'Awaiting Teacher Review'
    check (status in ('Awaiting Teacher Review', 'Teacher Reviewed')),
  teacher_mark text,
  teacher_feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.messages (
  id text primary key default gen_random_uuid()::text,
  sender_id text not null,
  receiver_id text,
  class_id text references public.classes(id) on delete cascade,
  message_type text not null default 'direct'
    check (message_type in ('direct', 'broadcast', 'query')),
  text text not null,
  read boolean not null default false,
  flagged boolean not null default false,
  flag_reason text,
  created_at timestamptz not null default now(),
  constraint message_has_recipient check (receiver_id is not null or class_id is not null)
);

create table if not exists public.audit_logs (
  id text primary key default gen_random_uuid()::text,
  school_id text references public.schools(id) on delete set null,
  actor_id text,
  actor_role text,
  action text not null,
  details text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists students_class_idx on public.students(class_id);
create index if not exists students_last_active_idx on public.students(last_active_at desc);
create index if not exists attempts_student_date_idx on public.attempts(student_id, attempted_at desc);
create index if not exists programming_student_date_idx
  on public.programming_submissions(student_id, submitted_at desc);
create index if not exists written_student_date_idx
  on public.written_submissions(student_id, submitted_at desc);
create index if not exists messages_receiver_date_idx
  on public.messages(receiver_id, created_at desc);
create index if not exists audit_school_date_idx
  on public.audit_logs(school_id, created_at desc);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'schools', 'coordinators', 'classes', 'students', 'assignments',
    'assignment_recipients', 'test_preps', 'test_prep_recipients',
    'support_sessions', 'support_session_recipients', 'attempts',
    'programming_submissions', 'written_submissions', 'messages', 'audit_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from anon, authenticated', table_name);
  end loop;
end
$$;

insert into public.schools (id, name, city, country, domain)
values (
  'school_1',
  'Leicester High School',
  'Leicester',
  'United Kingdom',
  'leicesterhigh.co.uk'
)
on conflict (id) do update
set name = excluded.name,
    city = excluded.city,
    country = excluded.country,
    domain = excluded.domain,
    updated_at = now();
