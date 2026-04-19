-- CodeNest schema + RLS
-- Run in the Supabase SQL editor (or via supabase db push).

-- =========================================================
-- Extensions
-- =========================================================
create extension if not exists "pgcrypto";

-- =========================================================
-- profiles (mirrors auth.users with a display handle)
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username',
             split_part(new.email, '@', 1) || '-' || substr(new.id::text, 1, 4)),
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- repositories
-- =========================================================
create table if not exists public.repositories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text default '',
  visibility text not null default 'public' check (visibility in ('public','private')),
  created_at timestamptz not null default now(),
  unique (user_id, name)
);
create index if not exists repositories_user_idx on public.repositories(user_id);
create index if not exists repositories_visibility_idx on public.repositories(visibility);

-- =========================================================
-- files
-- =========================================================
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  repo_id uuid not null references public.repositories(id) on delete cascade,
  name text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (repo_id, name)
);
create index if not exists files_repo_idx on public.files(repo_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_files_updated_at on public.files;
create trigger trg_files_updated_at
  before update on public.files
  for each row execute function public.touch_updated_at();

-- =========================================================
-- Row Level Security
-- =========================================================
alter table public.profiles enable row level security;
alter table public.repositories enable row level security;
alter table public.files enable row level security;

-- --- profiles ---
drop policy if exists "profiles readable by everyone" on public.profiles;
create policy "profiles readable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- --- repositories ---
drop policy if exists "public repos visible to all, private to owner" on public.repositories;
create policy "public repos visible to all, private to owner"
  on public.repositories for select
  using (visibility = 'public' or auth.uid() = user_id);

drop policy if exists "owner can insert repo" on public.repositories;
create policy "owner can insert repo"
  on public.repositories for insert
  with check (auth.uid() = user_id);

drop policy if exists "owner can update repo" on public.repositories;
create policy "owner can update repo"
  on public.repositories for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "owner can delete repo" on public.repositories;
create policy "owner can delete repo"
  on public.repositories for delete
  using (auth.uid() = user_id);

-- --- files (visibility follows parent repo) ---
drop policy if exists "files selectable when repo visible" on public.files;
create policy "files selectable when repo visible"
  on public.files for select
  using (
    exists (
      select 1 from public.repositories r
      where r.id = files.repo_id
        and (r.visibility = 'public' or r.user_id = auth.uid())
    )
  );

drop policy if exists "files writable by repo owner" on public.files;
create policy "files writable by repo owner"
  on public.files for all
  using (
    exists (
      select 1 from public.repositories r
      where r.id = files.repo_id and r.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.repositories r
      where r.id = files.repo_id and r.user_id = auth.uid()
    )
  );
