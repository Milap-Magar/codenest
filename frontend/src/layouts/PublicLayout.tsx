import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="grain min-h-screen">
      <Outlet />
    </div>
  );
}
