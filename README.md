# CodeNest

> Code. Manage. Ship — Simply.

A modern, lightweight GitHub alternative. Split into a **frontend** (React + Vite + Tailwind + TanStack Query) and a **backend** (Supabase — Postgres + Auth + RLS, no custom server code).

```
codenest/
├── frontend/      # React + TypeScript + Tailwind SPA
└── backend/       # Supabase schema + RLS policies + setup notes
```

## Running only the frontend

The frontend boots in "demo mode" without a configured backend — you can explore
the landing page, auth pages, and 404 without any Supabase setup.

```bash
cd frontend
cp .env.example .env    # leave values blank to stay in demo mode
npm install
npm run dev             # http://localhost:5173
```

A dismissable banner at the top of the app reminds you that the backend is not
configured. Auth + repository actions will show a friendly error until you add
real Supabase credentials.

## Adding the backend later

1. Create a Supabase project at https://supabase.com.
2. Open `backend/README.md` and follow the 3-step setup.
3. Drop the **Project URL** and **anon public key** into `frontend/.env`.
4. Restart `npm run dev`. The banner disappears, auth works, repos persist.

## System architecture (high level)

```
 ┌──────────────┐     HTTPS (JWT)     ┌────────────────────────┐
 │  React SPA   │ ──────────────────▶ │  Supabase (Postgres)   │
 │  (Vite)      │    supabase-js      │  • Auth (JWT issuer)   │
 │              │ ◀────────────────── │  • Postgres tables     │
 │  TanStack    │    RLS-protected    │  • RLS policies        │
 │  Query cache │    row data         │  • Triggers            │
 └──────────────┘                     └────────────────────────┘
```

- **No custom backend code.** The browser authenticates directly against Supabase
  Auth. Every table query is authorized by **row-level security** — the database
  itself is the authorization layer.
- **Typed domain layer.** `frontend/src/types/database.ts` defines `Repository`,
  `FileRow`, `Profile`. Hooks cast the results from `supabase-js` into these
  types, keeping the UI decoupled from the SDK shape.
- **TanStack Query** handles caching, invalidation on mutation, and retry/stale
  logic. One `queryKey` per resource kind.
- **React Router** drives public vs. protected routes. `<ProtectedRoute>` waits
  for the initial session check, then redirects unauthenticated users to
  `/login` with a `from` state so they land back where they were.

See `backend/README.md` for schema + policy details.
