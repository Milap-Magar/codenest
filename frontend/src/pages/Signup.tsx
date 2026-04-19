import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/services/supabaseClient';
import { AuthAside } from '@/pages/Login';

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      toast.error('Backend not configured. Add Supabase env vars to .env.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!/^[a-z0-9_-]{3,20}$/i.test(username)) {
      toast.error('Username: 3-20 chars, letters, numbers, - or _');
      return;
    }
    setSubmitting(true);
    try {
      await signUp(email, password, username);
      toast.success('Account created — check your email if confirmation is required');
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <AuthAside mode="signup" />
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

          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-ink-400">
            Free forever. No credit card required.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <Field label="Username" hint="3–20 chars · letters, numbers, - or _">
              <input
                required
                className="input font-mono"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="octocat"
              />
            </Field>
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
            <Field label="Password" hint="At least 6 characters.">
              <input
                type="password"
                required
                autoComplete="new-password"
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
              <UserPlus className="h-4 w-4" />
              {submitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-500">
            By signing up you agree to our{' '}
            <a href="#" className="underline hover:text-ink-300">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-ink-300">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-6 text-center text-sm text-ink-400">
            Already have one?{' '}
            <Link to="/login" className="text-accent-300 hover:text-accent-400">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink-300">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
    </label>
  );
}
