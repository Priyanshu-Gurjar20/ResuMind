import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const createAccount = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      return setError("Please complete all fields.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");

      const response = await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      console.log("Registration successful:", response.data);

      navigate("/login", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  const googleSignup = () => {
    localStorage.setItem("resumind_user", "true");
    localStorage.setItem("resumind_user_name", "ResuMind User");
    localStorage.setItem("resumind_user_email", "google-user@resumind.app");
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8"><Link to="/" className="text-3xl font-bold text-slate-900 dark:text-white">Resu<span className="text-indigo-600">Mind</span></Link><p className="mt-2 text-slate-600 dark:text-slate-400">Build your career with confidence.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
          <p className="mt-2 mb-7 text-sm text-slate-500 dark:text-slate-400">Start building your professional resume.</p>
          <button type="button" onClick={googleSignup} className="w-full rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Continue with Google</button>
          <div className="my-6 flex items-center gap-4"><div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /><span className="text-xs text-slate-400">OR</span><div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /></div>
          <form onSubmit={createAccount}>
            {[['Full Name', name, setName, 'text', 'Enter your full name'], ['Email', email, setEmail, 'email', 'you@example.com'], ['Password', password, setPassword, 'password', 'Create a password'], ['Confirm Password', confirm, setConfirm, 'password', 'Confirm your password']].map(([label, value, setter, type, placeholder]) => <div className="mb-4" key={label}><label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label><input required value={value} onChange={(e) => { setter(e.target.value); setError("") }} type={type} placeholder={placeholder} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white" /></div>)}
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            <button type="submit" className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 transition">Create Account</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-indigo-600">Sign in</Link></p>
        </div>
        <div className="mt-6 text-center"><Link to="/" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white">← Back to home</Link></div>
      </div>
    </main>
  );
}
