create table if not exists public.team_os_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.team_os_state enable row level security;

-- The Vercel API should use SUPABASE_SERVICE_ROLE_KEY, so browser clients do not
-- need direct table access. No public policy is required for the recommended setup.
