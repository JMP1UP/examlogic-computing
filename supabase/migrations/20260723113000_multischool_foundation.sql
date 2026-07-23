-- Multi-school SaaS foundations for ExamLogic Computing.
-- A school is the tenant boundary. Authentication and MIS integrations are
-- configured per school so no customer-specific credentials live in code.

alter table public.schools
  add column if not exists slug text,
  add column if not exists status text not null default 'trial',
  add column if not exists subscription_tier text not null default 'pilot',
  add column if not exists onboarding_status text not null default 'setup',
  add column if not exists data_region text not null default 'uk',
  add column if not exists settings jsonb not null default '{}'::jsonb,
  add column if not exists billing_customer_reference text;

update public.schools
set slug = case
  when id = 'school_1' then 'leicester-high'
  else lower(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g'))
end
where slug is null;

alter table public.schools
  alter column slug set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'schools_status_check'
  ) then
    alter table public.schools add constraint schools_status_check
      check (status in ('trial', 'active', 'suspended', 'closed'));
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'schools_subscription_tier_check'
  ) then
    alter table public.schools add constraint schools_subscription_tier_check
      check (subscription_tier in ('pilot', 'school', 'school_plus', 'enterprise'));
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'schools_onboarding_status_check'
  ) then
    alter table public.schools add constraint schools_onboarding_status_check
      check (onboarding_status in ('setup', 'identity', 'roster', 'pilot', 'live'));
  end if;
end
$$;

create unique index if not exists schools_slug_unique_idx
  on public.schools (lower(slug));

create table if not exists public.school_domains (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schools(id) on delete cascade,
  domain text not null,
  is_primary boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  unique (school_id, domain)
);

create unique index if not exists school_domains_domain_unique_idx
  on public.school_domains (lower(domain));

create table if not exists public.identity_providers (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schools(id) on delete cascade,
  provider text not null
    check (provider in ('microsoft', 'google', 'saml', 'password')),
  display_name text not null,
  issuer text,
  tenant_identifier text,
  client_id text,
  secret_reference text,
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, provider)
);

comment on column public.identity_providers.secret_reference is
  'Reference to a deployment secret; never store an OAuth client secret in this table.';

create table if not exists public.external_identities (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schools(id) on delete cascade,
  provider text not null,
  provider_tenant text not null default '',
  provider_subject text not null,
  coordinator_id text references public.coordinators(id) on delete cascade,
  student_id text references public.students(id) on delete cascade,
  email_at_link_time text,
  last_signed_in_at timestamptz,
  created_at timestamptz not null default now(),
  constraint external_identity_has_one_profile check (
    (coordinator_id is not null and student_id is null)
    or (coordinator_id is null and student_id is not null)
  ),
  unique (provider, provider_tenant, provider_subject)
);

create index if not exists external_identities_school_idx
  on public.external_identities (school_id);

create table if not exists public.school_integrations (
  id text primary key default gen_random_uuid()::text,
  school_id text not null references public.schools(id) on delete cascade,
  integration_type text not null
    check (integration_type in ('veracross', 'wonde', 'csv', 'manual')),
  display_name text not null,
  secret_reference text,
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default false,
  sync_status text not null default 'not_configured'
    check (sync_status in ('not_configured', 'ready', 'syncing', 'healthy', 'error', 'paused')),
  last_synced_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (school_id, integration_type)
);

comment on column public.school_integrations.secret_reference is
  'Reference to a deployment secret; never store MIS credentials in this table.';

alter table public.coordinators
  drop constraint if exists coordinators_email_key;
alter table public.students
  drop constraint if exists students_email_key;

create unique index if not exists coordinators_school_email_unique_idx
  on public.coordinators (school_id, lower(email));
create unique index if not exists students_school_email_unique_idx
  on public.students (school_id, lower(email));

alter table public.coordinators
  alter column password_hash drop not null;
alter table public.students
  alter column password_hash drop not null;

insert into public.school_domains (school_id, domain, is_primary, verified_at)
select id, domain, true, now()
from public.schools
where domain is not null
on conflict (school_id, domain) do nothing;

insert into public.identity_providers (
  school_id, provider, display_name, tenant_identifier, enabled
)
values (
  'school_1',
  'microsoft',
  'Leicester High Microsoft account',
  null,
  false
)
on conflict (school_id, provider) do nothing;

insert into public.identity_providers (
  school_id, provider, display_name, enabled
)
values (
  'school_1',
  'password',
  'ExamLogic pilot account',
  true
)
on conflict (school_id, provider) do nothing;

insert into public.school_integrations (
  school_id, integration_type, display_name, enabled, sync_status
)
values (
  'school_1',
  'manual',
  'Pilot class roster',
  true,
  'ready'
)
on conflict (school_id, integration_type) do nothing;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'school_domains', 'identity_providers', 'external_identities',
    'school_integrations'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from anon, authenticated', table_name);
  end loop;
end
$$;
