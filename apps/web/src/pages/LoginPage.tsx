import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password });
      setUser(data.user);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-lg border px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded-lg border px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        No account?{" "}
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}