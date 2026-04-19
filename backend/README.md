# CodeNest backend

The "backend" here is Supabase — no server code, no Express. This folder holds
the SQL that defines your schema and RLS policies, plus the setup notes.

## Files

```
backend/
├── README.md
└── supabase/
    └── schema.sql    # tables, triggers, row-level security policies
```

## Setup

1. Create a Supabase project at https://supabase.com.
2. Open **SQL Editor** → **New query**, paste `supabase/schema.sql`, and run it.
3. In **Authentication → Providers**, enable **Email**. For faster local testing,
   disable "Confirm email" under **Auth settings**.
4. Grab **Project URL** and the **anon public key** from **Project Settings → API**.
5. Put them in `frontend/.env`:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

Done. Restart the frontend dev server and the config banner disappears.

## Schema

| Table          | Purpose                                                   |
| -------------- | --------------------------------------------------------- |
| `profiles`     | Public user metadata (username, avatar), keyed by auth.id |
| `repositories` | Owned by a user. `visibility ∈ {public, private}`         |
| `files`        | Plain-text files belonging to a repository                |

### Triggers

- `handle_new_user` — on `auth.users` insert, creates a `profiles` row using
  `raw_user_meta_data.username` (or derives one from the email).
- `touch_updated_at` — keeps `files.updated_at` fresh on every update.

### RLS policies (summary)

- **profiles**: anyone can read; owner can update their row.
- **repositories**:
  - SELECT — `visibility = 'public'` OR `auth.uid() = user_id`.
  - INSERT/UPDATE/DELETE — `auth.uid() = user_id`.
- **files**: inherit the parent repo's visibility for reads; writes restricted
  to the repo owner.

The anon key is safe to ship to the browser — it can only do what RLS allows.

## System design notes

- **Why Supabase?** It collapses three components (auth, Postgres, API) into one
  hosted service. With RLS, authorization moves into the database, and we avoid
  writing a custom API layer. Tradeoff: vendor coupling, and policy logic lives
  in SQL instead of application code — review it carefully.
- **Why separate `profiles` from `auth.users`?** `auth.users` is managed by
  Supabase and has restricted access. `profiles` gives us a public-readable
  projection (username, avatar) we control.
- **Why plain-text `files.content` instead of Storage?** The product requirement
  is text-only. When/if binary files are needed, swap `content` for a
  `storage_path` and use Supabase Storage with signed URLs.
- **Unique constraints.** `(user_id, name)` on repositories, and `(repo_id, name)`
  on files, prevent duplicates and create implicit path addressing.

## Optional next steps

- `stars(repo_id, user_id)` table + toggle endpoint for favorites.
- A `search_repositories(q text)` Postgres function for ILIKE search over
  public repos.
- Supabase Realtime subscriptions to live-update the dashboard on repo changes.
