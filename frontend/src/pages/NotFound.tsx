import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="grain grid min-h-screen place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-accent-400">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-ink-400">
          This page might have moved, never existed, or been permanently closed.
        </p>
        <Link to="/" className="btn-accent mt-6 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </div>
  );
}
