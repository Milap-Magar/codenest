import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AppLayout from '@/layouts/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ConfigBanner from '@/components/ConfigBanner';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Repository from '@/pages/Repository';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <>
      <ConfigBanner />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/repo/:id" element={<Repository />} />
        </Route>

        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
