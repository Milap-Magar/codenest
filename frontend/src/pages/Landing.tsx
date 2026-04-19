import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Rocket,
  Shield,
  Zap,
  FolderGit2,
  FileCode2,
  Sparkles,
  ArrowRight,
  Check,
  Terminal,
  Lock,
  GitBranch,
  Boxes,
  Command,
  Layers,
  Globe,
  Quote,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/landing/HeroBackground';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-60px' },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Landing() {
  return (
    <>
      <Navbar variant="public" />

      <Hero />
      <LogoStrip />
      <Features />
      <CodeShowcase />
      <Workflow />
      <Preview />
      <Stats />
      <Testimonials />
      <Pricing />
      <FinalCTA />

      <Footer />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-28 pt-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:pt-32">
        <div className="flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="chip pill-gradient w-max bg-ink-900/60"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-300" />
            <span className="text-ink-100">New · v0.1 is live</span>
            <span className="text-ink-500">·</span>
            <span className="text-brand-300">read notes →</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-5xl font-semibold tracking-tightest sm:text-6xl lg:text-[72px] lg:leading-[1.04]"
          >
            Code. Manage.{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Ship</span>
              <svg
                aria-hidden
                viewBox="0 0 220 14"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent-500"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 10 Q 60 2 110 7 T 218 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />— Simply.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300"
          >
            CodeNest is a lightweight, opinionated home for your code. Create
            repositories, manage files, collaborate — without setup overhead, wizard
            screens, or eight-second page loads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/signup" className="btn-accent btn-lg">
              Start free — it's 60 seconds
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#preview" className="btn-outline btn-lg">
              <Terminal className="h-4 w-4" /> Live demo
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-400"
          >
            {['No credit card', 'Supabase-powered', 'Open by default'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-400" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPreview() {
  const files = [
    { n: 'README.md', active: true },
    { n: 'package.json' },
    { n: 'src/app.ts' },
    { n: 'src/router.ts' },
    { n: 'src/utils.ts' },
    { n: '.env.example' },
  ];
  return (
    <div className="relative">
      {/* floating chips */}
      <div className="absolute -left-10 top-12 hidden animate-float-slow rounded-xl border border-ink-800 bg-ink-900/90 p-3 text-xs shadow-lift backdrop-blur md:block">
        <div className="flex items-center gap-2 text-brand-300">
          <Check className="h-3.5 w-3.5" /> Saved
        </div>
        <div className="mt-0.5 text-ink-400">README.md · 2s ago</div>
      </div>
      <div className="absolute -right-6 top-[58%] hidden animate-float-slower rounded-xl border border-accent-500/30 bg-accent-500/10 p-3 text-xs shadow-lift backdrop-blur md:block">
        <div className="flex items-center gap-2 text-accent-300">
          <Sparkles className="h-3.5 w-3.5" /> RLS enforced
        </div>
        <div className="mt-0.5 text-ink-300">private · owner only</div>
      </div>

      <div className="relative rounded-2xl border border-ink-800 bg-ink-900/80 p-2 shadow-lift">
        <div className="flex items-center gap-1.5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff605c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd44]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#00ca4e]" />
          <span className="ml-3 rounded-md bg-ink-800 px-2 py-0.5 font-mono text-[11px] text-ink-300">
            codenest.dev/you/hello-world
          </span>
          <span className="chip-brand ml-auto">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            Live
          </span>
        </div>
        <div className="grid grid-cols-12 gap-0 overflow-hidden rounded-xl border border-ink-800">
          <div className="col-span-4 border-r border-ink-800 bg-ink-900 p-3 text-sm">
            <div className="mb-2 flex items-center gap-2 text-ink-400">
              <FolderGit2 className="h-4 w-4" /> hello-world
            </div>
            <ul className="space-y-0.5 font-mono text-[12.5px]">
              {files.map((f) => (
                <li
                  key={f.n}
                  className={`flex items-center gap-2 rounded px-2 py-1 ${
                    f.active
                      ? 'bg-accent-500/15 text-ink-50'
                      : 'text-ink-300 hover:bg-ink-800/60'
                  }`}
                >
                  <FileCode2 className="h-3.5 w-3.5 text-ink-400" /> {f.n}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-8 bg-ink-950 p-4 font-mono text-[12.5px] leading-6 text-ink-200">
            <div className="flex items-center justify-between text-ink-400">
              <span>README.md</span>
              <span className="chip">main</span>
            </div>
            <pre className="mt-3 whitespace-pre-wrap">
<span className="text-brand-300"># hello-world</span>{'\n\n'}
<span className="text-ink-400">{'> Code. Manage. Ship — Simply.'}</span>{'\n\n'}
<span className="text-accent-300">- [x]</span> Create repo{'\n'}
<span className="text-accent-300">- [x]</span> Add files{'\n'}
<span className="text-accent-300">- [ ]</span> Invite team{'\n'}
<span className="text-accent-300">- [ ]</span> Ship{' '}
<span className="text-signal-amber">🚀</span>
<span className="ml-0.5 inline-block h-[1em] w-[0.55em] -translate-y-[2px] bg-accent-300 align-middle animate-caret" />
            </pre>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-inset ring-white/5"
      />
    </div>
  );
}

/* ---------------- Logos ---------------- */

function LogoStrip() {
  const logos = ['Acme', 'Vercelly', 'Northbeam', 'Lumen', 'Statica', 'Hyperdrive', 'Tessera', 'Postmark'];
  const doubled = [...logos, ...logos];
  return (
    <section className="border-y border-ink-800/60 bg-ink-950/40 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-500">
          Trusted by fast-moving teams
        </p>
        <div className="mask-fade-x mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {doubled.map((l, i) => (
              <span
                key={`${l}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-ink-400/80"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

function Features() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <span className="eyebrow">Features</span>
          <h2 className="mt-3 section-heading">
            Everything you need.
            <span className="text-gradient-b"> Nothing you don't.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-300">
            A focused toolkit for the 90% of work you actually do each day — without the
            ceremony.
          </p>
        </motion.div>

        <motion.div {...stagger} className="mt-14 grid gap-5 md:grid-cols-6">
          {FEATURES.map((f, idx) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`card-hover group relative overflow-hidden p-6 ${SPAN_CLASS[f.span]}`}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(122,87,245,0.08), transparent 40%)',
                }}
              />
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/30 text-accent-300 shadow-inner-ring">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{f.desc}</p>
                {f.bullets && (
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-400">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-brand-400" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
                {idx === 0 && <FeatureSpark />}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const SPAN_CLASS: Record<number, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  6: 'md:col-span-6',
};

type Feature = {
  title: string;
  desc: string;
  icon: typeof Rocket;
  span: number;
  bullets?: string[];
};

const FEATURES: Feature[] = [
  {
    title: 'Fast repo creation',
    desc: 'Spin up a new repository in seconds — no templates, no wizards, no setup tax.',
    icon: Rocket,
    span: 3,
    bullets: ['One-click public or private', 'Supabase-backed storage', 'Instant dashboard update'],
  },
  {
    title: 'Simple file management',
    desc: 'Create, edit, and delete text files inline. No checkout step, no conflicts.',
    icon: FileCode2,
    span: 3,
    bullets: ['Inline editor with save shortcut', 'Optimistic cache invalidation', 'Keyboard-first'],
  },
  {
    title: 'Secure by default',
    desc: 'Supabase Auth + row-level security make private stay private. No backend code needed.',
    icon: Shield,
    span: 2,
  },
  {
    title: 'Minimal & fast',
    desc: 'Single-page app. Sub-100ms interactions. Serverless all the way down.',
    icon: Zap,
    span: 2,
  },
  {
    title: 'Own your data',
    desc: 'Plain PostgreSQL under the hood. Export anytime, own the keys.',
    icon: Boxes,
    span: 2,
  },
];

function FeatureSpark() {
  return (
    <svg viewBox="0 0 160 40" className="mt-5 h-10 w-full text-brand-400">
      <defs>
        <linearGradient id="spark" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M2 28 L20 22 L36 25 L52 10 L72 18 L92 8 L112 20 L132 6 L158 16"
        fill="none"
        stroke="url(#spark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Code showcase ---------------- */

function CodeShowcase() {
  return (
    <section className="relative border-t border-ink-800/60 bg-ink-950/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div {...fadeUp}>
          <span className="eyebrow">Built on Supabase</span>
          <h2 className="mt-3 section-heading">
            Ship the product,
            <br />
            <span className="text-gradient-b">not the plumbing.</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg text-ink-300">
            Zero custom backend. Auth, database, and row-level authorization are
            configured once in SQL, then wired into typed TanStack Query hooks.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-ink-300">
            {[
              { icon: Layers, t: 'Typed domain layer — Repository, FileRow, Profile' },
              { icon: Command, t: 'TanStack Query caches, invalidates, and retries' },
              { icon: Lock, t: 'RLS policies enforce ownership server-side' },
              { icon: Globe, t: 'Public repos readable by anyone, instantly' },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-accent-500/10 text-accent-300 ring-1 ring-accent-500/30">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp}>
          <CodeCard />
        </motion.div>
      </div>
    </section>
  );
}

function CodeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 shadow-lift">
      <div className="flex items-center gap-2 border-b border-ink-800 bg-ink-900/80 px-4 py-2.5 font-mono text-xs text-ink-400">
        <FileCode2 className="h-3.5 w-3.5" /> hooks/useRepositories.ts
        <span className="ml-auto chip">TypeScript</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
<code>{`import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/services/supabaseClient';
import type { Repository } from '@/types/database';

export function useMyRepositories() {
  return useQuery({
    queryKey: ['repositories', 'mine'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('repositories')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Repository[];
    },
  });
}

export function useCreateRepository() {
  return useMutation({
    mutationFn: async (input) => {
      const { data } = await supabase
        .from('repositories')
        .insert(input)
        .select('*')
        .single();
      return data as Repository;
    },
  });
}`}</code>
      </pre>
    </div>
  );
}

/* ---------------- Workflow ---------------- */

function Workflow() {
  const steps = [
    {
      title: 'Sign up in seconds',
      desc: 'Email + password or magic link. Supabase Auth issues a JWT we trust end-to-end.',
      icon: Lock,
    },
    {
      title: 'Create a repository',
      desc: 'Name it, pick public or private, and you are in. No wizards, no setup pages.',
      icon: FolderGit2,
    },
    {
      title: 'Manage your files',
      desc: 'Add files, edit content inline, and keep moving. Nothing blocks you — ever.',
      icon: GitBranch,
    },
  ];

  return (
    <section id="workflow" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <span className="eyebrow">Workflow</span>
          <h2 className="mt-3 section-heading">
            From signup to shipping in{' '}
            <span className="text-gradient">under 60 seconds.</span>
          </h2>
        </motion.div>

        <motion.ol
          {...stagger}
          className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {steps.map((s, i) => (
            <motion.li
              variants={item}
              key={s.title}
              className="relative"
            >
              <div className="card-hover h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 font-mono text-sm text-accent-300">
                    0{i + 1}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/30 text-brand-300">
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-400">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ink-600 md:block"
                  aria-hidden
                />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ---------------- Preview ---------------- */

function Preview() {
  return (
    <section id="preview" className="relative border-t border-ink-800/60 bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <span className="eyebrow">Preview</span>
          <h2 className="mt-3 section-heading">
            A dashboard that gets{' '}
            <span className="text-gradient-b">out of your way.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-300">
            Clean repository cards, instant search, one-click create. Everything you
            expect — none of the clutter.
          </p>
        </motion.div>
        <motion.div {...fadeUp} className="mt-12">
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMock() {
  const repos = [
    { name: 'hello-world', desc: 'Starter repo for exploring CodeNest', visibility: 'public', files: 5, updated: '2h ago' },
    { name: 'api-gateway', desc: 'Internal routing service', visibility: 'private', files: 18, updated: '1d ago' },
    { name: 'ui-kit', desc: 'Shared component library', visibility: 'public', files: 42, updated: '4h ago' },
    { name: 'notes', desc: 'Personal scratchpad + drafts', visibility: 'private', files: 9, updated: '15m ago' },
    { name: 'design-tokens', desc: 'Shared design tokens + theme', visibility: 'public', files: 7, updated: '3d ago' },
    { name: 'experiments', desc: 'Prototypes and one-offs', visibility: 'private', files: 23, updated: '6h ago' },
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/70 p-4 shadow-lift sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-2">
        <div className="flex items-center gap-2 text-ink-200">
          <FolderGit2 className="h-4 w-4 text-brand-400" />
          <span className="text-sm font-semibold">Your repositories</span>
          <span className="chip">12 total</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              disabled
              placeholder="Search repos…"
              className="input h-9 w-60 pr-12 opacity-80"
            />
            <span className="kbd absolute right-2 top-1/2 -translate-y-1/2">⌘K</span>
          </div>
          <span className="btn-accent pointer-events-none">+ New</span>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <div
            key={r.name}
            className="card-hover group relative overflow-hidden p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-brand-400" />
                <span className="font-semibold">{r.name}</span>
              </div>
              <span className={`chip ${r.visibility === 'private' ? '' : 'chip-brand'}`}>
                {r.visibility}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-ink-400">{r.desc}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-ink-500">
              <span>{r.files} files</span>
              <span>·</span>
              <span>updated {r.updated}</span>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ink-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
                style={{ width: `${20 + (r.files * 3) % 80}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Stats ---------------- */

function Stats() {
  const stats = [
    { k: '60s', label: 'Median signup-to-first-repo' },
    { k: '99.98%', label: 'Uptime · last 90 days' },
    { k: '0', label: 'Custom backend code required' },
    { k: '12ms', label: 'p50 query latency' },
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="card relative overflow-hidden p-8 sm:p-12"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-brand-500/10"
          />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="text-4xl font-semibold tracking-tightest text-ink-50 sm:text-5xl">
                  {s.k}
                </div>
                <div className="mt-2 text-sm text-ink-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

function Testimonials() {
  const items = [
    {
      q: 'We dropped three internal tools for CodeNest. The dashboard is fast, the defaults are sane, and the RLS model just works.',
      who: 'Ava Chen',
      role: 'Staff Engineer · Northbeam',
    },
    {
      q: 'Finally something that feels light. I stopped dreading the "new repo" step.',
      who: 'Marcus Okafor',
      role: 'Founder · Tessera',
    },
    {
      q: "The Supabase-first approach saved us a backend. It's the first dev tool our PM asked to try.",
      who: 'Priya Raman',
      role: 'Head of Platform · Lumen',
    },
  ];
  return (
    <section className="border-y border-ink-800/60 bg-ink-950/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <span className="eyebrow">Loved by builders</span>
          <h2 className="mt-3 section-heading">
            The fastest path from idea to <span className="text-gradient">repo.</span>
          </h2>
        </motion.div>

        <motion.div {...stagger} className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <motion.figure
              key={t.who}
              variants={item}
              className="card-hover relative flex h-full flex-col p-6"
            >
              <Quote className="h-6 w-6 text-accent-500/60" />
              <blockquote className="mt-4 text-ink-200">{t.q}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-800 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-brand-500 font-semibold text-white">
                  {t.who
                    .split(' ')
                    .map((x) => x[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink-100">{t.who}</div>
                  <div className="text-xs text-ink-500">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      sub: 'Forever. No credit card.',
      cta: 'Get started',
      to: '/signup',
      features: ['Unlimited public repos', '3 private repos', 'Community support'],
      accent: false,
    },
    {
      name: 'Pro',
      price: '$9',
      sub: 'per user / month',
      cta: 'Start Pro trial',
      to: '/signup',
      features: [
        'Unlimited private repos',
        'Priority support',
        'Advanced search',
        'Team workspaces (coming)',
      ],
      accent: true,
    },
    {
      name: 'Team',
      price: 'Custom',
      sub: 'For orgs that need more.',
      cta: 'Contact sales',
      to: '#',
      features: ['SSO / SAML', 'Audit logs', 'Dedicated region', 'SLA'],
      accent: false,
    },
  ];

  return (
    <section id="pricing" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-3 section-heading">
            Start free. Scale when it's <span className="text-gradient-b">worth it.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-300">
            No surprise fees, no per-seat gotchas, no "contact us to unfurl a link".
          </p>
        </motion.div>

        <motion.div
          {...stagger}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {plans.map((p) => (
            <motion.div
              key={p.name}
              variants={item}
              className={`card relative p-6 ${
                p.accent
                  ? 'border-accent-500/50 shadow-glow'
                  : 'hover:border-ink-700'
              }`}
            >
              {p.accent && (
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-accent-500 to-brand-500 px-3 py-0.5 text-xs font-semibold">
                  Most popular
                </span>
              )}
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-300">
                {p.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tightest">{p.price}</span>
                <span className="text-sm text-ink-400">{p.sub}</span>
              </div>
              <Link
                to={p.to}
                className={`mt-5 w-full ${p.accent ? 'btn-accent' : 'btn-outline'}`}
              >
                {p.cta}
              </Link>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-300">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="card relative overflow-hidden px-6 py-12 text-center sm:px-12"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-accent-500/15 via-transparent to-brand-500/20"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 -top-32 h-[320px] bg-[radial-gradient(closest-side,rgba(122,87,245,0.25),transparent)]"
          />
          <div className="relative">
            <span className="chip-accent mx-auto w-max">
              <Sparkles className="h-3.5 w-3.5" /> Ready when you are
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tightest sm:text-5xl">
              Your next repo is{' '}
              <span className="text-gradient">one click away.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-300">
              Stop fighting your tools. Start shipping.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/signup" className="btn-accent btn-lg">
                Create your account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="btn-outline btn-lg">
                I already have one
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
