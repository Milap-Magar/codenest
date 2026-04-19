import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowRight, LogIn, Sparkles } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/services/supabaseClient';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ??
    '/dashboard';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error('Backend not configured. Add Supabase env vars to .env.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <AuthAside mode="login" />
      <div className="flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
            <Logo className="h-7 w-7" />
            <span className="text-lg font-semibold">
              Code<span className="text-gradient-b">Nest</span>
            </span>
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-ink-400">
            Sign in to manage your repositories.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <Field label="Email">
              <input
                type="email"
                required
                autoComplete="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />
            </Field>
            <Field
              label="Password"
              right={
                <a
                  href="#"
                  className="text-xs text-ink-400 transition hover:text-ink-100"
                >
                  Forgot?
                </a>
              }
            >
              <input
                type="password"
                required
                autoComplete="current-password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>
            <button
              type="submit"
              disabled={submitting}
              className="btn-accent btn-lg w-full"
            >
              <LogIn className="h-4 w-4" />
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink-400">
            New here?{' '}
            <Link to="/signup" className="text-accent-300 hover:text-accent-400">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function AuthAside({ mode }: { mode: 'login' | 'signup' }) {
  return (
    <aside className="relative hidden overflow-hidden border-r border-ink-800/80 bg-ink-950 lg:block">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(122,87,245,0.25),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(26,194,113,0.18),transparent_60%)]"
      />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative flex h-full flex-col p-12">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight">
            Code<span className="text-gradient-b">Nest</span>
          </span>
        </Link>

        <div className="mt-auto max-w-md">
          <span className="chip-accent">
            <Sparkles className="h-3.5 w-3.5" />
            {mode === 'login' ? 'Welcome back' : 'Join CodeNest'}
          </span>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">
            {mode === 'login' ? (
              <>
                Your repos,
                <br />
                <span className="text-gradient">right where you left them.</span>
              </>
            ) : (
              <>
                The fastest way
                <br />
                <span className="text-gradient">from idea to repo.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-ink-400">
            CodeNest is a lightweight GitHub alternative — built on Supabase, secured
            with RLS, fast by default.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs text-ink-500">
            <ArrowRight className="h-3.5 w-3.5" />
            No credit card
            <span>·</span>
            Email + password auth
            <span>·</span>
            RLS-secured
          </div>
        </div>
      </div>
    </aside>
  );
}

function Field({
  label,
  right,
  children,
}: {
  label: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm text-ink-300">
        {label}
        {right}
      </span>
      {children}
    </label>
  );
}
