import { useEffect, useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3, Bot, FileCheck2, FileText, LayoutTemplate, Plus, Search,
  Settings, Sparkles, Target, ArrowRight, X, User, Mail, Palette,
  Shield, LogOut, Clock3, Eye, Trash2, RotateCcw, ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";

const VERSIONS_STORAGE_KEY = "resumind_saved_versions";
const BUILDER_STORAGE_KEY = "resumind-builder-current-v1";

function Dashboard() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null);
  const [versions, setVersions] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem("resumind_user_name") || "ResuMind User");
  const userEmail = localStorage.getItem("resumind_user_email") || "your@email.com";


  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await API.get("/resumes");

        setVersions(
          response.data.resumes.map((resume) => ({
            id: resume._id,
            name: resume.title,
            createdAt: resume.createdAt,
            templateId: resume.template,
            resume: resume.content,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
        setVersions([]);
      }
    };

    fetchResumes();
  }, []);



  const closePanel = () => setActivePanel(null);

  const restoreVersion = (version) => {
    localStorage.setItem(
      BUILDER_STORAGE_KEY,
      JSON.stringify(version.resume)
    );

    navigate(
      `/builder?template=${version.templateId || "minimal"}&resumeId=${version.id}`
    );
  };


  const deleteVersion = async (id) => {
    try {
      await API.delete(`/resumes/${id}`);

      setVersions((prev) => prev.filter((version) => version.id !== id));
    } catch (error) {
      console.error("Delete Resume Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete resume"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resumind_user");
    localStorage.removeItem("resumind_user_name");
    localStorage.removeItem("resumind_user_email");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden min-h-[calc(100vh-65px)] w-64 shrink-0 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
          <nav className="space-y-1">
            <SidebarItem icon={<BarChart3 size={18} />} label="Dashboard" active />
            <Link to="/my-resumes"><SidebarItem icon={<FileText size={18} />} label="My Resumes" /></Link>
            <Link to="/templates"><SidebarItem icon={<LayoutTemplate size={18} />} label="Templates" /></Link>
            <Link to="/ats-checker"><SidebarItem icon={<FileCheck2 size={18} />} label="Resume Checker" /></Link>
            <Link to="/ai-tools"><SidebarItem icon={<Target size={18} />} label="Job Matcher" /></Link>
            <Link to="/ai-tools"><SidebarItem icon={<Bot size={18} />} label="AI Tools" /></Link>
            <button type="button" onClick={() => setActivePanel("saved")} className="w-full text-left">
              <SidebarItem icon={<Sparkles size={18} />} label="Saved Versions" active={activePanel === "saved"} />
            </button>
            <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />
            <button type="button" onClick={() => setActivePanel("settings")} className="w-full text-left">
              <SidebarItem icon={<Settings size={18} />} label="Settings" active={activePanel === "settings"} />
            </button>
          </nav>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Your workspace</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back 👋</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Build, analyze and optimize your resumes from one place.</p>
            </div>
            <Link to="/builder" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"><Plus size={18} />Create Resume</Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={<FileText size={19} />} label="My Resumes" value={String(versions.length)} />
            <StatCard icon={<BarChart3 size={19} />} label="Best Readiness Score" value="—" />
            <StatCard icon={<Target size={19} />} label="Job Matches" value="0" />
            <StatCard icon={<Sparkles size={19} />} label="AI Optimizations" value="0" />
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div><h2 className="font-semibold">Recent Resumes</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your latest resume versions</p></div>
                <button onClick={() => setActivePanel("saved")} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">View all</button>
              </div>
              {versions.length === 0 ? (
                <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 text-center dark:border-slate-700">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"><FileText size={22} /></div>
                  <h3 className="mt-4 text-sm font-semibold">No saved versions yet</h3>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">Build your resume and use Save Version in Builder to keep snapshots you can restore later.</p>
                  <Link to="/builder" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"><Plus size={15} />Create your first resume</Link>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {versions.slice(0, 3).map((version) => <VersionRow key={version.id} version={version} onRestore={restoreVersion} onDelete={deleteVersion} />)}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-semibold">Quick Tools</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Improve your resume faster</p>
              <div className="mt-5 space-y-3">
                <Link to="/ats-checker" className="block"><QuickTool icon={<FileCheck2 size={18} />} title="Resume Checker" description="Analyze ATS readiness" /></Link>
                <Link to="/ai-tools" className="block"><QuickTool icon={<Search size={18} />} title="Job Matcher" description="Match your resume to a job" /></Link>
                <Link to="/ai-tools" className="block"><QuickTool icon={<Bot size={18} />} title="AI Assistant" description="Improve your resume content" /></Link>
                <Link to="/builder" className="block"><QuickTool icon={<FileText size={18} />} title="One-Page AI" description="Optimize a long resume" /></Link>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div><div className="flex items-center gap-2"><Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" /><p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Get started with ResuMind</p></div><p className="mt-2 max-w-2xl text-xs leading-5 text-indigo-700/70 dark:text-indigo-300/70">Create your first resume, choose a professional template, then use AI to check and optimize it for your target role.</p></div>
              <Link to="/builder" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-indigo-700">Start Building<ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
      </div>

      {activePanel === "saved" && <ModalOverlay onClose={closePanel}>
        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"><Sparkles size={19} /></div><div><h2 className="font-semibold">Saved Versions</h2><p className="text-xs text-slate-500 dark:text-slate-400">Restore or manage your resume snapshots</p></div></div><button onClick={closePanel} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={19} /></button></div>
          <div className="max-h-[65vh] overflow-auto p-6">
            {versions.length === 0 ? <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 text-center dark:border-slate-700"><Clock3 size={26} className="text-slate-400" /><h3 className="mt-4 text-sm font-semibold">No saved versions yet</h3><p className="mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400">Open Builder, make your resume, then click Save Version.</p><Link to="/builder" onClick={closePanel} className="mt-5 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white">Open Builder</Link></div> : <div className="space-y-3">{versions.map((version) => <VersionRow key={version.id} version={version} onRestore={restoreVersion} onDelete={deleteVersion} large />)}</div>}
          </div>
        </div>
      </ModalOverlay>}

      {activePanel === "settings" && <ModalOverlay onClose={closePanel}>
        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"><Settings size={19} /></div><div><h2 className="font-semibold">Settings</h2><p className="text-xs text-slate-500 dark:text-slate-400">Manage your ResuMind account</p></div></div><button onClick={closePanel} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={19} /></button></div>
          <div className="space-y-5 p-6">
            <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"><div className="mb-4 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><User size={18} /></div><div><h3 className="text-sm font-semibold">Profile</h3><p className="text-xs text-slate-500 dark:text-slate-400">Your account information</p></div></div><div className="space-y-4"><div><label className="mb-1.5 block text-xs font-medium">Full Name</label><input value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950" /></div><div><label className="mb-1.5 block text-xs font-medium">Email</label><div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"><Mail size={15} className="text-slate-400" /><span className="text-sm text-slate-600 dark:text-slate-300">{userEmail}</span></div></div><button onClick={() => { localStorage.setItem("resumind_user_name", userName.trim() || "ResuMind User"); alert("Profile updated successfully."); }} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700">Save Changes</button></div></div>
            <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Palette size={18} /></div><div className="flex-1"><h3 className="text-sm font-semibold">Preferences</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Workspace appearance follows your system theme.</p></div></div></div>
            <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Shield size={18} /></div><div className="flex-1"><h3 className="text-sm font-semibold">Security</h3><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Authentication is currently handled by the ResuMind frontend demo flow.</p></div><ChevronRight size={17} className="text-slate-400" /></div></div>
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-5 py-4 text-left hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/20"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"><LogOut size={18} /></div><div><p className="text-sm font-semibold text-red-600 dark:text-red-400">Log out</p><p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Sign out from this device</p></div></button>
          </div>
        </div>
      </ModalOverlay>}
    </main>
  );
}

function VersionRow({ version, onRestore, onDelete, large = false }) {
  const date = new Date(version.createdAt);
  const title = version.name || "Untitled Version";
  return <div className={`flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:border-indigo-900/60 dark:hover:bg-indigo-950/20 ${large ? "sm:flex-row sm:items-center" : "sm:flex-row sm:items-center"}`}>
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"><FileText size={18} /></div>
    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{version.templateId || "minimal"} template · {date.toLocaleString()}</p></div>
    <div className="flex items-center gap-2"><button onClick={() => onRestore(version)} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"><RotateCcw size={13} />Restore</button><button onClick={() => onDelete(version.id)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-red-200 hover:text-red-600 dark:border-slate-700"><Trash2 size={15} /></button></div>
  </div>;
}

function ModalOverlay({ children, onClose }) { return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>{children}</div>; }
function SidebarItem({ icon, label, active = false }) { return <div className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>{icon}{label}</div>; }
function StatCard({ icon, label, value }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">{icon}</div><p className="mt-5 text-xs text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>; }
function QuickTool({ icon, title, description }) { return <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/30"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{icon}</div><div className="min-w-0"><p className="text-xs font-semibold">{title}</p><p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">{description}</p></div></button>; }
export default Dashboard;
