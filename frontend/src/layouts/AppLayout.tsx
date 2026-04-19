import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

export default function AppLayout() {
  return (
    <div className="grain min-h-screen">
      <Navbar variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
