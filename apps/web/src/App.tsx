import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import { useAuthStore } from "./store/authStore";
import { Navbar } from "./components/Navbar";

export default function App() {
  const setUser = useAuthStore((s) => s.setUser);
  const isAuthResolved = useAuthStore((s) => s.isAuthResolved);
  const setAuthResolved = useAuthStore((s) => s.setAuthResolved);

  useEffect(() => {
    async function bootstrapAuth() {
      const user = await getCurrentUser();
      setUser(user);
      setAuthResolved(true);
    }

    bootstrapAuth();
  }, [setUser, setAuthResolved]);

  if (!isAuthResolved) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-4xl p-6">
        <Outlet />
      </main>
    </div>
  );
}