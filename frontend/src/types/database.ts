// Domain types used by the frontend. Kept separate from the Supabase
// Database generic so hooks stay ergonomic and decoupled from the SDK's
// shape (avoids the "never" overload trap from newer typed clients).

export type Visibility = 'public' | 'private';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Repository {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  visibility: Visibility;
  created_at: string;
}

export interface FileRow {
  id: string;
  repo_id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface NewRepositoryInput {
  name: string;
  description?: string;
  visibility: Visibility;
}

export interface NewFileInput {
  name: string;
  content?: string;
}
