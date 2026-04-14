import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function Navbar() {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    clearUser();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Quote Tracker
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/public" className="text-sm text-slate-700 hover:underline">
            Public
          </Link>

          {user ? (
            <>
              <Link to="/" className="text-sm text-slate-700 hover:underline">
                Dashboard
              </Link>
              <Link to="/quotes/new" className="text-sm text-slate-700 hover:underline">
                New Quote
              </Link>
              <span className="text-sm text-slate-500">{user.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:underline">
                Login
              </Link>
              <Link to="/signup" className="text-sm hover:underline">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}