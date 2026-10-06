import { Link } from "react-router-dom";
import {
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("resumind_user") === "true");

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const logout = () => {
    localStorage.removeItem("resumind_user");
    setLoggedIn(false);
    closeMenu();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">

      {/* Main Navbar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:grid md:grid-cols-3">

        {/* Logo */}
        <div className="flex justify-start">
          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white"
          >
            Resu<span className="text-indigo-600">Mind</span>
          </Link>
        </div>


        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center gap-8 md:flex">

          <Link
            to="/templates"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            Templates
          </Link>

          <Link
            to="/ai-tools"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            AI Tools
          </Link>

          <Link
            to="/ats-checker"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            ATS Checker
          </Link>

        </div>


        {/* Desktop Actions */}
        <div className="hidden items-center justify-end gap-3 md:flex">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>


          {loggedIn ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Dashboard</Link>
              <button onClick={logout} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">Login</Link>
              <Link to="/signup" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md">Get Started</Link>
            </>
          )}

        </div>


        {/* Mobile Actions */}
        <div className="flex items-center justify-end gap-2 md:hidden">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={17} />
            ) : (
              <Sun size={17} />
            )}
          </button>


          {/* Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>

        </div>

      </div>


      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">

          <div className="flex flex-col gap-1">

            <Link
              to="/templates"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
            >
              Templates
            </Link>

            <Link
              to="/ai-tools"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
            >
              AI Tools
            </Link>

            <Link
              to="/ats-checker"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
            >
              ATS Checker
            </Link>

            <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

            {loggedIn ? (
              <>
                <Link to="/dashboard" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900">Dashboard</Link>
                <button onClick={logout} className="mt-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="mt-1 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700">Get Started</Link>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;