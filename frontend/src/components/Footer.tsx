import { Link } from 'react-router-dom';
import { Send, Briefcase, Code2, Mail } from 'lucide-react';
import Logo from '@/components/Logo';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Workflow', href: '#workflow' },
      { label: 'Preview', href: '#preview' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Brand kit', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Support', href: 'mailto:hello@codenest.dev' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-800/80 bg-ink-950/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="text-lg font-semibold tracking-tight">
                Code<span className="text-gradient-b">Nest</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-ink-400">
              A lightweight home for your code. Built for speed, clarity, and the 90% of
              work you actually do each day.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Send, href: '#', label: 'Twitter' },
                { Icon: Briefcase, href: '#', label: 'LinkedIn' },
                { Icon: Code2, href: '#', label: 'GitHub' },
                { Icon: Mail, href: 'mailto:hello@codenest.dev', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 text-ink-300 transition hover:border-accent-500/40 hover:text-ink-50"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-ink-300">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-400 transition hover:text-ink-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-800/80 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} CodeNest. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-ink-500">
            <a href="#" className="hover:text-ink-200">Privacy</a>
            <a href="#" className="hover:text-ink-200">Terms</a>
            <a href="#" className="hover:text-ink-200">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
