import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await signup({
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      setUser(data.user);
      navigate("/");
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      setError(Array.isArray(errors) ? errors.join(", ") : "Signup failed");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold">Signup</h1>

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

        <input
          className="w-full rounded-lg border px-3 py-2"
          type="password"
          placeholder="Confirm password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white">
          Create account
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}