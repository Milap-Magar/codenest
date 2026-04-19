import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FolderGit2, Globe, Lock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useMyRepositories,
  useDeleteRepository,
} from '@/hooks/useRepositories';
import RepoCard from '@/components/RepoCard';
import NewRepoDialog from '@/components/NewRepoDialog';
import { useAuth } from '@/contexts/AuthContext';

type FilterKey = 'all' | 'public' | 'private';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: repos, isLoading, isError, error } = useMyRepositories();
  const del = useDeleteRepository();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!repos) return [];
    const q = query.trim().toLowerCase();
    return repos.filter((r) => {
      if (filter !== 'all' && r.visibility !== filter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description ?? '').toLowerCase().includes(q)
      );
    });
  }, [repos, query, filter]);

  const counts = useMemo(() => {
    const all = repos?.length ?? 0;
    const pub = repos?.filter((r) => r.visibility === 'public').length ?? 0;
    const priv = all - pub;
    return { all, public: pub, private: priv };
  }, [repos]);

  async function onDelete(id: string) {
    try {
      await del.mutateAsync(id);
      toast.success('Repository deleted');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  const greeting = useMemo(getGreeting, []);
  const displayName =
    (user?.user_metadata?.username as string | undefined) ??
    user?.email?.split('@')[0] ??
    'friend';

  return (
    <>
      {/* Greeting */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{greeting}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome back, <span className="text-gradient-b">{displayName}</span>.
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            Here's everything you own — search, filter, and jump in.
          </p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="btn-accent btn-lg whitespace-nowrap sm:self-center"
        >
          <Plus className="h-4 w-4" /> New repository
        </button>
      </div>

      {/* Stat strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard icon={FolderGit2} label="Total repositories" value={counts.all} tint="brand" />
        <StatCard icon={Globe} label="Public" value={counts.public} tint="accent" />
        <StatCard icon={Lock} label="Private" value={counts.private} tint="ink" />
      </div>

      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-lg border border-ink-800 bg-ink-900/60 p-1">
          {(['all', 'public', 'private'] as FilterKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                filter === k
                  ? 'bg-ink-800 text-ink-50 shadow-inner-ring'
                  : 'text-ink-400 hover:text-ink-100'
              }`}
            >
              {k} <span className="ml-1 text-xs text-ink-500">{counts[k]}</span>
            </button>
          ))}
        </div>
        <div className="relative max-w-sm flex-1 sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            className="input pl-9"
            placeholder="Search repos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="mt-6">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card h-36 animate-pulse bg-gradient-to-br from-ink-900/60 via-ink-900/40 to-ink-900/60"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="card p-6 text-sm text-red-300">
            <div className="font-medium">Failed to load repositories.</div>
            <div className="mt-1 text-ink-400">
              {(error as Error)?.message ?? 'Unknown error.'}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            hasRepos={counts.all > 0}
            filter={filter}
            query={query}
            onCreate={() => setDialogOpen(true)}
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04 } },
            }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((r) => (
              <motion.div
                key={r.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <RepoCard repo={r} onDelete={onDelete} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <NewRepoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 5) return 'Late night';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof FolderGit2;
  label: string;
  value: number;
  tint: 'brand' | 'accent' | 'ink';
}) {
  const tints: Record<typeof tint, string> = {
    brand: 'from-brand-500/20 to-brand-500/5 text-brand-300',
    accent: 'from-accent-500/20 to-accent-500/5 text-accent-300',
    ink: 'from-ink-700/30 to-ink-800/10 text-ink-200',
  };
  return (
    <div className="card-hover flex items-center gap-4 p-5">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tints[tint]} shadow-inner-ring`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-ink-400">{label}</div>
      </div>
    </div>
  );
}

function EmptyState({
  hasRepos,
  filter,
  query,
  onCreate,
}: {
  hasRepos: boolean;
  filter: FilterKey;
  query: string;
  onCreate: () => void;
}) {
  const searching = hasRepos && (filter !== 'all' || query.length > 0);
  return (
    <div className="card relative flex flex-col items-center justify-center overflow-hidden p-14 text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-brand-500/10"
      />
      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/30 text-accent-300 shadow-inner-ring">
          {searching ? <Search className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </div>
        <h3 className="mt-5 text-xl font-semibold">
          {searching ? 'No matches' : 'Start your first repository'}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">
          {searching
            ? 'Try a different search term or switch filters.'
            : 'A repo is a project home — code, files, and context all in one place.'}
        </p>
        {!searching && (
          <button onClick={onCreate} className="btn-accent mt-6">
            <Plus className="h-4 w-4" /> Create repository
          </button>
        )}
      </div>
    </div>
  );
}
