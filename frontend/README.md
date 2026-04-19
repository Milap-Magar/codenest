# CodeNest · frontend

React + TypeScript + Vite + Tailwind + TanStack Query. Boots standalone — no
backend required to demo the UI.

## Quickstart

```bash
cp .env.example .env   # leave blank for demo mode
npm install
npm run dev            # http://localhost:5173
```

To wire up the real backend, see `../backend/README.md` and drop your Supabase
URL + anon key into `.env`.

## Scripts

| Command          | What it does                           |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Vite dev server on :5173               |
| `npm run build`  | Type-check (`tsc -b`) and build `dist/` |
| `npm run preview`| Serve the built bundle                 |

## Architecture

```
src/
├── main.tsx               # providers (router, query, auth, toaster)
├── App.tsx                # route table
├── index.css              # Tailwind + design system primitives
│
├── services/
│   └── supabaseClient.ts  # Supabase SDK singleton + isSupabaseConfigured flag
├── types/
│   └── database.ts        # domain types: Repository, FileRow, Profile
├── contexts/
│   └── AuthContext.tsx    # session state + signIn/signUp/signOut
├── hooks/
│   ├── useRepositories.ts # TanStack Query: list/get/create/delete
│   └── useFiles.ts        # TanStack Query: list/create/update/delete
│
├── layouts/
│   ├── PublicLayout.tsx   # landing + auth shell
│   └── AppLayout.tsx      # authenticated shell
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ConfigBanner.tsx   # "Demo mode" banner when env is missing
│   ├── ProtectedRoute.tsx
│   ├── Logo.tsx
│   ├── RepoCard.tsx
│   ├── NewRepoDialog.tsx
│   └── landing/
│       └── HeroBackground.tsx
└── pages/
    ├── Landing.tsx        # marketing site (hero, features, code, etc.)
    ├── Login.tsx
    ├── Signup.tsx
    ├── Dashboard.tsx
    ├── Repository.tsx
    └── NotFound.tsx
```

## Design system

All tokens live in `tailwind.config.js` + `src/index.css`:

- **Palette** — `ink` (neutrals), `brand` (emerald), `accent` (violet), plus
  `signal.pink/amber/cyan` for one-off highlights.
- **Typography** — Inter for UI, JetBrains Mono for code. `section-heading`
  + `eyebrow` + `text-gradient` component classes for repeatable marketing
  typography.
- **Surfaces** — `card`, `card-hover` (adds border/shadow on hover), `chip` +
  `chip-brand` + `chip-accent`.
- **Motion** — `animate-float-slow/slower`, `animate-pulse-soft`, `animate-caret`,
  `animate-marquee`. Framer Motion handles scroll-triggered reveals in
  `Landing.tsx`.
- **Backgrounds** — `grain` (page bg), `grid-bg` (subtle grid with radial mask),
  `bg-shine` utility.

## Data flow

```
page  ──►  hook  ──►  supabaseClient  ──►  Supabase (Auth + Postgres + RLS)
           │                                      │
           └── TanStack Query cache  ◄────────────┘
```

- Queries: `useMyRepositories`, `useRepository(id)`, `useFiles(repoId)`.
- Mutations: `useCreateRepository`, `useDeleteRepository`, `useCreateFile`,
  `useUpdateFile`, `useDeleteFile`.
- Each mutation invalidates its relevant `queryKey` so the UI refreshes
  consistently.
