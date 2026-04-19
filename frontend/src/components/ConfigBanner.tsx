import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { isSupabaseConfigured } from '@/services/supabaseClient';

export default function ConfigBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (isSupabaseConfigured || dismissed) return null;

  return (
    <div className="relative z-50 border-b border-amber-500/30 bg-amber-500/10 text-amber-100">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2.5 text-sm sm:items-center sm:px-6 lg:px-8">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
        <p className="flex-1">
          <span className="font-medium">Demo mode:</span> backend is not configured.
          Copy <code className="rounded bg-amber-500/15 px-1 py-0.5 font-mono text-[12px]">.env.example</code> to{' '}
          <code className="rounded bg-amber-500/15 px-1 py-0.5 font-mono text-[12px]">.env</code>{' '}
          and add your Supabase URL &amp; anon key to enable auth and repositories.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="rounded p-1 transition hover:bg-amber-500/20"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
