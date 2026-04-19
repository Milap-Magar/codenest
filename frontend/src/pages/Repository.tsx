import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  FileCode2,
  FolderGit2,
  Globe,
  Lock,
  Plus,
  Save,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';
import { useRepository } from '@/hooks/useRepositories';
import {
  useCreateFile,
  useDeleteFile,
  useFiles,
  useUpdateFile,
} from '@/hooks/useFiles';
import { useAuth } from '@/contexts/AuthContext';

export default function Repository() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: repo, isLoading } = useRepository(id);
  const { data: files } = useFiles(id);
  const createFile = useCreateFile(id ?? '');
  const updateFile = useUpdateFile(id ?? '');
  const deleteFile = useDeleteFile(id ?? '');

  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [editor, setEditor] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  const isOwner = !!repo && !!user && repo.user_id === user.id;

  const activeFile = useMemo(
    () => files?.find((f) => f.id === activeFileId) ?? null,
    [files, activeFileId],
  );

  const isDirty = activeFile ? editor !== activeFile.content : false;

  function selectFile(fid: string) {
    const f = files?.find((x) => x.id === fid);
    setActiveFileId(fid);
    setEditor(f?.content ?? '');
  }

  async function onCreateFile(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[a-z0-9][a-z0-9._/-]{0,100}$/i.test(newFileName)) {
      toast.error('File name: letters, numbers, . _ / -');
      return;
    }
    try {
      const row = await createFile.mutateAsync({ name: newFileName });
      toast.success('File created');
      setNewFileName('');
      setCreating(false);
      setActiveFileId(row.id);
      setEditor('');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create file');
    }
  }

  async function onSave() {
    if (!activeFile || !isDirty) return;
    try {
      await updateFile.mutateAsync({ id: activeFile.id, content: editor });
      toast.success('Saved');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    }
  }

  async function onDelete(fid: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await deleteFile.mutateAsync(fid);
      toast.success('File deleted');
      if (fid === activeFileId) {
        setActiveFileId(null);
        setEditor('');
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  // Cmd/Ctrl+S save
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (isOwner) onSave();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, activeFile, isOwner]);

  async function onCopyContent() {
    if (!activeFile) return;
    await navigator.clipboard.writeText(editor);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-64 animate-pulse rounded bg-ink-800" />
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="card h-[60vh] animate-pulse lg:col-span-4 xl:col-span-3" />
          <div className="card h-[60vh] animate-pulse lg:col-span-8 xl:col-span-9" />
        </div>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ink-800 text-ink-400">
          <FolderGit2 className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Repository not found</h2>
        <p className="mt-2 text-sm text-ink-400">
          It may be private, deleted, or you may not have access.
        </p>
        <Link to="/dashboard" className="btn-accent mt-5 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start gap-3">
        <Link
          to="/dashboard"
          className="btn-ghost h-9 px-2.5"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-brand-400" />
            <h1 className="text-2xl font-semibold tracking-tight">{repo.name}</h1>
            <span
              className={repo.visibility === 'public' ? 'chip-brand' : 'chip'}
            >
              {repo.visibility === 'public' ? (
                <Globe className="h-3 w-3" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
              {repo.visibility}
            </span>
            <span className="chip">
              {files?.length ?? 0} {files?.length === 1 ? 'file' : 'files'}
            </span>
          </div>
          {repo.description && (
            <p className="mt-1.5 text-sm text-ink-400">{repo.description}</p>
          )}
        </div>
        {isOwner && (
          <button
            onClick={() => setCreating((c) => !c)}
            className="btn-outline h-9"
          >
            <Plus className="h-4 w-4" /> New file
          </button>
        )}
      </div>

      {/* Body */}
      <div className="grid gap-4 lg:grid-cols-12">
        <aside className="card p-3 lg:col-span-4 xl:col-span-3">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
              Files
            </span>
            {isOwner && (
              <button
                onClick={() => setCreating((c) => !c)}
                className="rounded p-1 text-ink-300 transition hover:bg-ink-800"
                aria-label="New file"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>

          {creating && isOwner && (
            <form onSubmit={onCreateFile} className="mb-2 flex gap-2 px-1 pt-2">
              <input
                autoFocus
                className="input h-9 font-mono"
                placeholder="README.md"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary h-9 px-3"
                disabled={createFile.isPending}
              >
                Add
              </button>
            </form>
          )}

          <ul className="mt-1 space-y-0.5">
            {(files ?? []).map((f) => (
              <li key={f.id}>
                <button
                  onClick={() => selectFile(f.id)}
                  className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-mono text-[13px] transition ${
                    f.id === activeFileId
                      ? 'bg-accent-500/15 text-ink-50 ring-1 ring-inset ring-accent-500/30'
                      : 'text-ink-300 hover:bg-ink-800/60'
                  }`}
                >
                  <FileCode2 className="h-3.5 w-3.5 text-ink-400" />
                  <span className="truncate">{f.name}</span>
                  {isOwner && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(f.id, f.name);
                      }}
                      className="ml-auto rounded p-0.5 text-ink-500 opacity-0 transition hover:text-red-400 group-hover:opacity-100 focus:opacity-100"
                      aria-label={`Delete ${f.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              </li>
            ))}
            {(!files || files.length === 0) && (
              <li className="px-2 py-8 text-center text-sm text-ink-500">
                {isOwner ? 'No files yet — add one.' : 'This repo is empty.'}
              </li>
            )}
          </ul>
        </aside>

        <section className="card overflow-hidden lg:col-span-8 xl:col-span-9">
          {activeFile ? (
            <>
              <div className="flex items-center justify-between gap-2 border-b border-ink-800 bg-ink-900/50 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-2 font-mono text-sm text-ink-200">
                  <FileCode2 className="h-4 w-4 text-ink-400" />
                  <span className="truncate">{activeFile.name}</span>
                  {isDirty && (
                    <span className="chip-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                      Unsaved
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onCopyContent}
                    className="btn-ghost h-8 px-2.5 text-xs"
                    aria-label="Copy content"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                  {isOwner && (
                    <button
                      onClick={onSave}
                      disabled={updateFile.isPending || !isDirty}
                      className="btn-primary h-8 px-3 text-xs"
                    >
                      <Save className="h-3.5 w-3.5" />
                      {updateFile.isPending ? 'Saving…' : 'Save'}
                      <span className="kbd ml-1 hidden sm:inline">⌘S</span>
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={editor}
                onChange={(e) => setEditor(e.target.value)}
                readOnly={!isOwner}
                spellCheck={false}
                className="min-h-[56vh] w-full resize-y bg-ink-950 p-5 font-mono text-sm leading-relaxed text-ink-100 outline-none"
                placeholder="# Start typing…"
              />
            </>
          ) : (
            <div className="flex min-h-[56vh] flex-col items-center justify-center p-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/30 text-accent-300 shadow-inner-ring">
                <FileCode2 className="h-6 w-6" />
              </div>
              <p className="mt-4 font-medium text-ink-200">Select a file to view</p>
              <p className="mt-1 text-sm text-ink-400">
                Or create a new one to start editing.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
