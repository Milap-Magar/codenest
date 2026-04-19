import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Globe, Lock, FolderGit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCreateRepository } from '@/hooks/useRepositories';
import type { Visibility } from '@/types/database';

export default function NewRepoDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (id: string) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('public');
  const create = useCreateRepository();

  useEffect(() => {
    if (!open) {
      setName('');
      setDescription('');
      setVisibility('public');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[a-z0-9][a-z0-9._-]{0,38}$/i.test(name)) {
      toast.error('Name: letters, numbers, . _ -  (up to 39 chars)');
      return;
    }
    try {
      const repo = await create.mutateAsync({ name, description, visibility });
      toast.success('Repository created');
      onCreated?.(repo.id);
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Could not create repository');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 grid place-items-center bg-ink-950/75 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-repo-title"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(closest-side,rgba(122,87,245,0.3),transparent)]"
            />
            <div className="relative flex items-center justify-between border-b border-ink-800 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/30 text-accent-300 shadow-inner-ring">
                  <FolderGit2 className="h-4 w-4" />
                </div>
                <div>
                  <h2 id="new-repo-title" className="text-base font-semibold">
                    Create a new repository
                  </h2>
                  <p className="text-xs text-ink-400">
                    Pick a name and visibility — that's it.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-ink-400 transition hover:bg-ink-800 hover:text-ink-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="relative space-y-5 p-6">
              <label className="block">
                <span className="mb-1.5 block text-sm text-ink-300">
                  Repository name
                </span>
                <input
                  required
                  autoFocus
                  className="input font-mono"
                  value={name}
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                  placeholder="hello-world"
                />
                <span className="mt-1 block text-xs text-ink-500">
                  Lowercase letters, numbers, dots, hyphens, underscores.
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-ink-300">
                  Description{' '}
                  <span className="text-ink-500">(optional)</span>
                </span>
                <input
                  className="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this repo about?"
                />
              </label>

              <fieldset className="grid grid-cols-2 gap-2">
                {(
                  [
                    {
                      v: 'public' as Visibility,
                      icon: Globe,
                      label: 'Public',
                      desc: 'Anyone can view. You control who writes.',
                    },
                    {
                      v: 'private' as Visibility,
                      icon: Lock,
                      label: 'Private',
                      desc: 'Only you can view and edit.',
                    },
                  ]
                ).map((opt) => {
                  const active = visibility === opt.v;
                  const Icon = opt.icon;
                  return (
                    <label
                      key={opt.v}
                      className={`relative cursor-pointer rounded-xl border p-3.5 text-sm transition ${
                        active
                          ? 'border-accent-500/80 bg-accent-500/10 shadow-glow'
                          : 'border-ink-800 hover:border-ink-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility"
                        className="sr-only"
                        checked={active}
                        onChange={() => setVisibility(opt.v)}
                      />
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-ink-300" />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                      <span className="mt-1 block text-xs text-ink-400">
                        {opt.desc}
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              <div className="flex justify-end gap-2 border-t border-ink-800 pt-5">
                <button type="button" onClick={onClose} className="btn-ghost">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={create.isPending}
                  className="btn-accent"
                >
                  {create.isPending ? 'Creating…' : 'Create repository'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
