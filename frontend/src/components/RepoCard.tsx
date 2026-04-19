import { Link } from 'react-router-dom';
import { FolderGit2, Globe, Lock, Trash2, ArrowUpRight } from 'lucide-react';
import type { Repository } from '@/types/database';

export default function RepoCard({
  repo,
  onDelete,
}: {
  repo: Repository;
  onDelete?: (id: string) => void;
}) {
  const created = new Date(repo.created_at);
  return (
    <div className="card-hover group relative overflow-hidden p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <Link
        to={`/repo/${repo.id}`}
        className="relative block focus-ring rounded-lg"
      >
        <div className="flex items-center gap-2">
          <FolderGit2 className="h-4 w-4 text-brand-400" />
          <h3 className="truncate font-semibold">{repo.name}</h3>
          <ArrowUpRight className="h-4 w-4 translate-y-0 text-ink-600 transition group-hover:-translate-y-0.5 group-hover:text-accent-300" />
          <span
            className={`ml-auto ${
              repo.visibility === 'public' ? 'chip-brand' : 'chip'
            }`}
          >
            {repo.visibility === 'public' ? (
              <Globe className="h-3 w-3" />
            ) : (
              <Lock className="h-3 w-3" />
            )}
            {repo.visibility}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm text-ink-400">
          {repo.description || 'No description yet.'}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs text-ink-500">
          <span>Created {created.toLocaleDateString()}</span>
          <span className="text-ink-700">·</span>
          <span className="font-mono">{repo.id.slice(0, 7)}</span>
        </div>
      </Link>

      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if (confirm(`Delete repository "${repo.name}"? This cannot be undone.`)) {
              onDelete(repo.id);
            }
          }}
          className="absolute right-3 top-3 rounded-md p-1.5 text-ink-400 opacity-0 transition hover:bg-ink-800 hover:text-red-300 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete repository"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
