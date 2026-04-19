import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

const PUBLIC_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#preview', label: 'Preview' },
  { href: '#pricing', label: 'Pricing' },
];

export default function Navbar({ variant = 'public' }: { variant?: 'public' | 'app' }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to={user ? '/dashboard' : '/'}
          className="group flex items-center gap-2.5 focus-ring rounded-md"
        >
          <Logo className="h-8 w-8 transition group-hover:scale-105" />
          <span className="text-lg font-semibold tracking-tight">
            Code<span className="text-gradient-b">Nest</span>
          </span>
        </Link>

        {variant === 'public' ? (
          <nav className="hidden items-center gap-1 text-sm text-ink-300 md:flex">
            {PUBLIC_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 transition hover:bg-ink-800/60 hover:text-ink-50"
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : (
          <nav className="flex items-center gap-1 text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-ink-800 text-ink-50'
                    : 'text-ink-300 hover:bg-ink-800/70'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
          </nav>
        )}

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="chip-accent hidden sm:inline-flex">
                <Sparkles className="h-3 w-3" />
                Beta
              </span>
              <button onClick={onSignOut} className="btn-outline" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Sign in
              </Link>
              <Link to="/signup" className="btn-accent">
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className="focus-ring rounded-md p-2 text-ink-200 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-800/80 bg-ink-950/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {variant === 'public' &&
              PUBLIC_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800"
                >
                  {l.label}
                </a>
              ))}
            <div className="mt-2 flex flex-col gap-2">
              {user ? (
                <button onClick={onSignOut} className="btn-outline">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-ghost">
                    Sign in
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-accent">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
