import { useState } from "react";
import API from "../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = location.state?.from || "/dashboard";

  const signIn = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }

    try {
      setError("");

      const response = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("resumind_user", "true");
      localStorage.setItem("resumind_user_name", user.name);
      localStorage.setItem("resumind_user_email", user.email);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    }
  };

  const googleSignIn = () => {
    localStorage.setItem("resumind_user", "true");
    localStorage.setItem("resumind_user_email", "google-user@resumind.app");
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-slate-900 dark:text-white">Resu<span className="text-indigo-600">Mind</span></Link>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Build a resume that gets noticed.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to continue building your resume.</p>
          </div>

          <button type="button" onClick={googleSignIn} className="w-full rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4"><div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /><span className="text-xs text-slate-400">OR</span><div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /></div>

          <form onSubmit={signIn}>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} type="email" placeholder="you@example.com" className="mb-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />

            <div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label><button type="button" className="text-sm font-medium text-indigo-600">Forgot password?</button></div>
            <input value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} type="password" placeholder="Enter your password" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <button type="submit" className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 transition">Sign In</button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">Don't have an account? <Link to="/signup" className="font-semibold text-indigo-600">Create account</Link></p>
        </div>

        <div className="mt-6 text-center"><Link to="/" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">← Back to home</Link></div>
      </div>
    </main>
  );
}
