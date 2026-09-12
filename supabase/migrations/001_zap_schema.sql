create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  zap_id text unique not null,
  display_name text not null check (char_length(display_name) between 1 and 40),
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  participant_a uuid not null references public.profiles(id) on delete cascade,
  participant_b uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(participant_a, participant_b)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now(),
  visible_at timestamptz not null default now()
);

create table if not exists public.message_sequences (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'New conversation',
  enabled boolean not null default true,
  delay_seconds integer not null default 180 check (delay_seconds >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.sequence_messages (
  id uuid primary key default gen_random_uuid(),
  sequence_id uuid not null references public.message_sequences(id) on delete cascade,
  position integer not null check (position >= 0),
  body text not null check (char_length(body) between 1 and 5000),
  unique(sequence_id, position)
);

create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index if not exists profiles_zap_id_idx on public.profiles(zap_id);

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.message_sequences enable row level security;
alter table public.sequence_messages enable row level security;

-- Policies are intentionally added in the authenticated deployment phase, once
-- the chosen authentication/guest-session model is connected. Do not expose
-- unrestricted inserts or reads from the public client.
