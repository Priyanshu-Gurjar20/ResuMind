import { Link } from "react-router-dom";
import {
    ArrowRight,
    Bot,
    Check,
    FileCheck2,
    FileText,
    Search,
    Sparkles,
    Target,
    WandSparkles,
    Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";

function LandingV2() {
    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <Navbar />

            {/* ================= HERO ================= */}
            <section className="relative px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24">
                <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300 sm:text-sm">
                        <Sparkles size={15} />
                        AI-powered resume intelligence
                    </div>

                    <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                        Build, check and{" "}
                        <span className="text-indigo-600 dark:text-indigo-400">
                            optimize
                        </span>{" "}
                        your resume with AI.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
                        Create an ATS-friendly resume, analyze it against real job
                        requirements, improve weak sections with AI, and keep everything
                        organized in one workspace.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                        <Link
                            to="/signup"
                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 sm:text-base"
                        >
                            Create My Resume
                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            to="/templates"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <FileText size={18} />
                            Explore Templates
                        </Link>
                    </div>

                    <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                        <span className="flex items-center gap-1.5">
                            <Check size={15} className="text-emerald-500" />
                            ATS Friendly
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Check size={15} className="text-emerald-500" />
                            AI Powered
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Check size={15} className="text-emerald-500" />
                            Job Matching
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Check size={15} className="text-emerald-500" />
                            PDF Export
                        </span>
                    </div>
                </div>
            </section>

            {/* ================= PRODUCT PREVIEW ================= */}
            <section className="px-4 pb-24 sm:px-6">
                <div className="mx-auto max-w-5xl">
                    <div className="relative">
                        {/* Score */}
                        <div className="absolute -right-3 top-8 z-20 hidden w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-emerald-500 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    92
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Resume Readiness
                                    </p>

                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Excellent
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Keyword Match
                                    </span>

                                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                        88%
                                    </span>
                                </div>

                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div className="h-full w-[88%] rounded-full bg-indigo-600" />
                                </div>
                            </div>
                        </div>

                        {/* Browser */}
                        <div className="mx-auto rounded-2xl border border-slate-200 bg-slate-100 p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-3">
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700">
                                <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-3 dark:border-slate-700 sm:px-4">
                                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />

                                    <div className="ml-2 h-7 flex-1 rounded-md bg-slate-100 dark:bg-slate-800 sm:ml-4" />
                                </div>

                                <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-5">
                                    {/* Builder sidebar */}
                                    <div className="hidden border-r border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900 md:col-span-2 md:block">
                                        <div className="flex items-center gap-2">
                                            <Bot
                                                size={18}
                                                className="text-indigo-600 dark:text-indigo-400"
                                            />

                                            <span className="text-sm font-semibold">
                                                Resume Builder
                                            </span>
                                        </div>

                                        <div className="mt-6 space-y-2">
                                            {[
                                                "Personal Information",
                                                "Professional Summary",
                                                "Experience",
                                                "Projects",
                                                "Skills",
                                                "Education",
                                            ].map((item, index) => (
                                                <div
                                                    key={item}
                                                    className={`rounded-lg px-3 py-2.5 text-xs font-medium ${
                                                        index === 1
                                                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                                                            : "text-slate-500 dark:text-slate-400"
                                                    }`}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/40">
                                            <div className="flex items-center gap-2">
                                                <Sparkles
                                                    size={15}
                                                    className="text-indigo-600 dark:text-indigo-400"
                                                />

                                                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                                                    AI Assistant
                                                </span>
                                            </div>

                                            <p className="mt-2 text-xs leading-5 text-indigo-700/70 dark:text-indigo-300/70">
                                                Improve your resume content with AI suggestions.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Resume */}
                                    <div className="flex min-w-0 items-center justify-center bg-slate-200/70 p-4 dark:bg-slate-950 md:col-span-3 sm:p-8">
                                        <div className="w-full max-w-md bg-white px-5 py-6 text-slate-800 shadow-2xl sm:px-8 sm:py-8">
                                            <div className="border-b-2 border-indigo-600 pb-4">
                                                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                                                    Alex Morgan
                                                </h2>

                                                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                                                    Software Developer
                                                </p>

                                                <p className="mt-3 text-[9px] text-slate-500 sm:text-[10px]">
                                                    alex.morgan@example.com • +1 555 012 3456 •
                                                    linkedin.com/in/alexmorgan
                                                </p>
                                            </div>

                                            <ResumeSection title="Summary">
                                                <p className="text-[9px] leading-4 text-slate-600 sm:text-[10px]">
                                                    Software developer experienced in building scalable
                                                    web applications using modern JavaScript technologies.
                                                    Focused on clean, reliable and user-friendly solutions.
                                                </p>
                                            </ResumeSection>

                                            <ResumeSection title="Experience">
                                                <div>
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h4 className="text-[10px] font-bold sm:text-[11px]">
                                                                Software Developer
                                                            </h4>

                                                            <p className="text-[9px] font-medium text-indigo-600 sm:text-[10px]">
                                                                NovaTech
                                                            </p>
                                                        </div>

                                                        <span className="shrink-0 text-[8px] text-slate-400 sm:text-[9px]">
                                                            2023 — Present
                                                        </span>
                                                    </div>

                                                    <ul className="mt-2 space-y-1 text-[8px] leading-3.5 text-slate-600 sm:text-[9px] sm:leading-4">
                                                        <li>
                                                            • Developed responsive web applications using React.
                                                        </li>
                                                        <li>
                                                            • Built REST APIs with Node.js and Express.
                                                        </li>
                                                        <li>
                                                            • Improved application performance and user experience.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </ResumeSection>

                                            <ResumeSection title="Projects">
                                                <div>
                                                    <h4 className="text-[10px] font-bold sm:text-[11px]">
                                                        DevBoard — Developer Productivity Platform
                                                    </h4>

                                                    <ul className="mt-2 space-y-1 text-[8px] leading-3.5 text-slate-600 sm:text-[9px] sm:leading-4">
                                                        <li>
                                                            • Built a full-stack productivity platform for developers.
                                                        </li>
                                                        <li>
                                                            • Implemented authentication, dashboards and REST APIs.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </ResumeSection>

                                            <ResumeSection title="Skills">
                                                <p className="text-[9px] leading-4 text-slate-600 sm:text-[10px]">
                                                    JavaScript • React • Node.js • Express • MongoDB •
                                                    Git • REST APIs • HTML • CSS
                                                </p>
                                            </ResumeSection>

                                            <ResumeSection title="Education">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h4 className="text-[10px] font-bold sm:text-[11px]">
                                                            B.S. in Computer Science
                                                        </h4>

                                                        <p className="text-[9px] text-slate-500 sm:text-[10px]">
                                                            Northbridge University
                                                        </p>
                                                    </div>

                                                    <span className="text-[8px] text-slate-400 sm:text-[9px]">
                                                        2019 — 2023
                                                    </span>
                                                </div>
                                            </ResumeSection>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= WORKFLOW ================= */}
            <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            How ResuMind works
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            From blank page to job-ready.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                            One workflow to create, understand and improve your resume.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                        <WorkflowCard
                            number="01"
                            icon={<FileText size={19} />}
                            title="Create"
                            text="Build your resume with professional templates."
                        />

                        <WorkflowCard
                            number="02"
                            icon={<Search size={19} />}
                            title="Check"
                            text="Analyze structure, content and ATS readiness."
                        />

                        <WorkflowCard
                            number="03"
                            icon={<WandSparkles size={19} />}
                            title="Optimize"
                            text="Improve weak sections with AI."
                        />

                        <WorkflowCard
                            number="04"
                            icon={<Target size={19} />}
                            title="Tailor"
                            text="Match your resume to a target job."
                        />

                        <WorkflowCard
                            number="05"
                            icon={<FileCheck2 size={19} />}
                            title="One-Page AI"
                            text="Intelligently fit long resumes to one page."
                        />

                        <WorkflowCard
                            number="06"
                            icon={<ArrowRight size={19} />}
                            title="Export"
                            text="Download your final resume as PDF."
                        />
                    </div>
                </div>
            </section>

            {/* ================= AI INTELLIGENCE ================= */}
            <section className="px-4 py-20 sm:px-6 sm:py-24">
                <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Resume intelligence
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Don't just get a score. Know what to fix.
                        </h2>

                        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                            ResuMind breaks your resume into meaningful signals and turns
                            problems into actionable improvements.
                        </p>

                        <div className="mt-8 space-y-4">
                            <InsightRow
                                icon={<Target size={18} />}
                                title="ATS & Structure"
                                text="Identify formatting and structure issues that can affect parsing."
                            />

                            <InsightRow
                                icon={<Search size={18} />}
                                title="Keyword Coverage"
                                text="Compare your skills and experience against the target job."
                            />

                            <InsightRow
                                icon={<Sparkles size={18} />}
                                title="Content Quality"
                                text="Find vague bullets and improve them with stronger language."
                            />

                            <InsightRow
                                icon={<Zap size={18} />}
                                title="Actionable AI Fixes"
                                text="Apply suggested improvements instead of manually rewriting everything."
                            />
                        </div>
                    </div>

                    {/* Analysis card */}
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        Resume Readiness
                                    </p>

                                    <p className="mt-1 text-3xl font-bold">
                                        92
                                        <span className="text-lg text-slate-400">
                                            /100
                                        </span>
                                    </p>
                                </div>

                                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                    Excellent
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <AnalysisBar
                                    label="ATS Compatibility"
                                    value="94%"
                                    width="94%"
                                />

                                <AnalysisBar
                                    label="Keyword Match"
                                    value="88%"
                                    width="88%"
                                />

                                <AnalysisBar
                                    label="Content Quality"
                                    value="91%"
                                    width="91%"
                                />

                                <AnalysisBar
                                    label="Job Alignment"
                                    value="86%"
                                    width="86%"
                                />
                            </div>

                            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={16} className="text-amber-600" />

                                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                                        AI recommendation
                                    </p>
                                </div>

                                <p className="mt-2 text-xs leading-5 text-amber-700/80 dark:text-amber-300/70">
                                    Add measurable results to your latest experience bullet
                                    to improve impact and job alignment.
                                </p>

                                <button className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    Fix with AI →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ONE PAGE AI ================= */}
            <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                    <FileCheck2 size={21} />
                                </div>

                                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                    One-Page AI
                                </span>
                            </div>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                                Too long? Let AI fix the page count.
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                                Instead of shrinking everything until the resume becomes
                                unreadable, ResuMind first identifies redundancy, prioritizes
                                valuable content and then optimizes spacing and layout.
                            </p>

                            <div className="mt-7 space-y-3">
                                {[
                                    "Prioritize high-value content",
                                    "Remove unnecessary repetition",
                                    "Optimize spacing and layout",
                                    "Preserve readability and ATS compatibility",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                                    >
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                            <Check size={13} />
                                        </span>

                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-950">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">
                                        Resume optimization
                                    </span>

                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                        Optimized
                                    </span>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
                                    <PageCard pages="2" label="Before" />

                                    <ArrowRight
                                        className="shrink-0 text-indigo-500"
                                        size={22}
                                    />

                                    <PageCard
                                        pages="1"
                                        label="After AI"
                                        highlight
                                    />
                                </div>

                                <div className="mt-8 rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-900">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        AI reduced redundancy while preserving important
                                        experience and keywords.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TEMPLATES ================= */}
            <section className="px-4 py-20 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                Templates
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Start with a template built to be noticed.
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                                Modern designs with clean structure and ATS-friendly layouts.
                            </p>
                        </div>

                        <Link
                            to="/templates"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:gap-3 dark:text-indigo-400"
                        >
                            View all templates
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        <TemplateCard
                            name="Minimal"
                            templateId="minimal"
                        />

                        <TemplateCard
                            name="Modern"
                            templateId="modern"
                            featured
                        />

                        <TemplateCard
                            name="Executive"
                            templateId="executive"
                        />
                    </div>
                </div>
            </section>

            {/* ================= FINAL CTA ================= */}
            <section className="px-4 pb-20 sm:px-6 sm:pb-24">
                <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-100 bg-indigo-50 px-6 py-14 text-center dark:border-indigo-900/50 dark:bg-indigo-950/30 sm:px-10 sm:py-16">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        Ready when you are
                    </p>

                    <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                        Build a resume that works as hard as you do.
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                        Create it, check it, optimize it and take it confidently to your
                        next application.
                    </p>

                    <Link
                        to="/signup"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 sm:text-base"
                    >
                        Start Building
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}


/* ================= WORKFLOW CARD ================= */

function WorkflowCard({ number, icon, title, text }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                    {number}
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    {icon}
                </div>
            </div>

            <h3 className="mt-5 text-sm font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {text}
            </p>
        </div>
    );
}


/* ================= INSIGHT ROW ================= */

function InsightRow({ icon, title, text }) {
    return (
        <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                {icon}
            </div>

            <div>
                <h3 className="text-sm font-semibold">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {text}
                </p>
            </div>
        </div>
    );
}


/* ================= ANALYSIS BAR ================= */

function AnalysisBar({ label, value, width }) {
    return (
        <div>
            <div className="flex items-center justify-between text-xs">
                <span className="font-medium">
                    {label}
                </span>

                <span className="text-slate-500 dark:text-slate-400">
                    {value}
                </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width }}
                />
            </div>
        </div>
    );
}


/* ================= PAGE CARD ================= */

function PageCard({ pages, label, highlight = false }) {
    return (
        <div className="text-center">
            <div
                className={`mx-auto flex h-40 w-28 items-center justify-center rounded-lg border-2 shadow-sm sm:h-48 sm:w-32 ${
                    highlight
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
                        : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
                }`}
            >
                <div className="text-center">
                    <p className="text-3xl font-bold">
                        {pages}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {pages === "1" ? "page" : "pages"}
                    </p>
                </div>
            </div>

            <p
                className={`mt-3 text-xs font-semibold ${
                    highlight
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-500 dark:text-slate-400"
                }`}
            >
                {label}
            </p>
        </div>
    );
}


/* ================= RESUME SECTION ================= */

function ResumeSection({ title, children }) {
    return (
        <section className="mt-4">
            <h3 className="mb-2 text-[9px] font-bold uppercase tracking-widest text-indigo-600 sm:text-[10px]">
                {title}
            </h3>

            {children}
        </section>
    );
}


/* ================= TEMPLATE CARD ================= */

function TemplateCard({
    name,
    templateId,
    featured = false,
}) {
    return (
        <Link
            to={`/builder?template=${templateId}`}
            className={`group block overflow-hidden rounded-2xl border bg-slate-50 p-3 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 ${
                featured
                    ? "border-indigo-300 dark:border-indigo-800"
                    : "border-slate-200 dark:border-slate-800"
            }`}
        >
            {/* Template Preview */}
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-xl bg-slate-200 p-5 dark:bg-slate-950">
                <div className="h-full w-44 bg-white p-4 shadow-xl transition duration-300 group-hover:scale-[1.02]">
                    <div className="border-b border-indigo-600 pb-3">
                        <div className="h-3 w-24 rounded bg-slate-800" />

                        <div className="mt-2 h-1.5 w-16 rounded bg-indigo-500" />
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="h-1.5 w-16 rounded bg-slate-700" />
                        <div className="h-1 w-full rounded bg-slate-200" />
                        <div className="h-1 w-11/12 rounded bg-slate-200" />
                        <div className="h-1 w-10/12 rounded bg-slate-200" />
                    </div>

                    <div className="mt-5 space-y-2">
                        <div className="h-1.5 w-20 rounded bg-slate-700" />
                        <div className="h-1 w-full rounded bg-slate-200" />
                        <div className="h-1 w-10/12 rounded bg-slate-200" />
                        <div className="h-1 w-11/12 rounded bg-slate-200" />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1">
                        <span className="h-3 w-8 rounded bg-indigo-50" />
                        <span className="h-3 w-10 rounded bg-indigo-50" />
                        <span className="h-3 w-7 rounded bg-indigo-50" />
                    </div>
                </div>

                {/* Hover CTA */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Use Template →
                </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between px-2 pb-1 pt-4">
                <span className="text-sm font-semibold">
                    {name}
                </span>

                {featured && (
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        Popular
                    </span>
                )}
            </div>
        </Link>
    );
}

export default LandingV2;