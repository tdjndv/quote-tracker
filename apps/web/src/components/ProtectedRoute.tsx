import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const isAuthResolved = useAuthStore((s) => s.isAuthResolved);
  const location = useLocation();

  if (!isAuthResolved) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}