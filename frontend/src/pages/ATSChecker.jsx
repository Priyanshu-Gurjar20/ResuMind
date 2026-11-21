import { useMemo, useRef, useState } from "react";
import API from "../api/api";
import {
    AlertCircle,
    ArrowRight,
    BarChart3,
    Check,
    CheckCircle2,
    ChevronRight,
    FileCheck2,
    FileText,
    Info,
    Link as LinkIcon,
    Lock,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    Upload,
    X,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const STOP_WORDS = new Set([
    "the", "and", "for", "with", "that", "this", "from", "your", "you", "are", "our", "have", "has", "will", "into", "using", "use", "to", "of", "in", "on", "a", "an", "is", "as", "be", "or", "at", "by", "it", "was", "were", "their", "they", "can", "not", "but", "we", "i", "my", "me", "about", "than", "then", "also", "more", "such", "all", "any", "job", "role", "work", "working"
]);

const REQUIRED_HEADINGS = [
    ["Experience", /\b(experience|work history|employment)\b/i],
    ["Education", /\b(education|academic|university|college|degree)\b/i],
    ["Skills", /\b(skills|technical skills|core competencies|technologies)\b/i],
];

function ATSChecker() {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [dragging, setDragging] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [aiAnalysis, setAiAnalysis] = useState(null);

    const localAudit = useMemo(() => analyzeText(resumeText, jobDescription), [resumeText, jobDescription]);

    const aiAudit = useMemo(() => {
        if (!aiAnalysis) return null;

        const score = Math.max(
            0,
            Math.min(100, Number(aiAnalysis.atsScore) || 0)
        );

        const checks = [
            {
                title: "Overall ATS assessment",
                max: 100,
                points: score,
                status: score >= 80 ? "good" : score >= 55 ? "warn" : "bad",
                detail: aiAnalysis.summary || "Gemini ATS assessment completed."
            }
        ];

        const issues = [
            ...(aiAnalysis.weaknesses || []).map((item, index) => ({
                title: typeof item === "string"
                    ? item.length > 55
                        ? `${item.slice(0, 52)}...`
                        : item
                    : item.title || `Resume issue ${index + 1}`,
                detail: typeof item === "string"
                    ? item
                    : item.detail,
                fix: "Review this issue and improve it using accurate resume information."
            })),
            ...(aiAnalysis.suggestions || []).map((item) => ({
                title: "AI suggestion",
                detail: item,
                fix: "Apply this suggestion only when factually accurate."
            }))
        ];

        const jd = {
            enabled: Boolean(jobDescription.trim()),
            detected: [],
            missing: aiAnalysis.missingKeywords || [],
            total: (aiAnalysis.missingKeywords || []).length
        };

        return {
            score,
            label: score >= 85 ? "Strong compatibility" :
                score >= 70 ? "Good, with improvements" :
                    score >= 55 ? "Needs improvement" :
                        "High-risk for ATS parsing",
            checks,
            passed: score >= 80 ? 1 : 0,
            issues,
            strengths: (aiAnalysis.strengths || []).map((item) => ({
                title: "AI identified strength",
                detail: item
            })),
            jd
        };
    }, [aiAnalysis, jobDescription]);

    const handleFile = (nextFile) => {
        if (!nextFile) return;
        const allowed = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        ];
        const isText = nextFile.type.startsWith("text/") || /\.(txt|md)$/i.test(nextFile.name);
        if (!allowed.includes(nextFile.type) && !isText) return;
        setFile(nextFile);
        setScanned(false);
        if (isText) {
            const reader = new FileReader();
            reader.onload = (event) => setResumeText(String(event.target?.result || ""));
            reader.readAsText(nextFile);
        } else {
            setResumeText("");
        }
    };

    const removeFile = () => {
        setFile(null);
        setResumeText("");
        setScanned(false);
        if (inputRef.current) inputRef.current.value = "";
    };

    const runAudit = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        setUploadError("");
        setScanned(false);

        try {
            const formData = new FormData();
            formData.append("resume", file);
            formData.append("jobDescription", jobDescription);

            const response = await API.post(
                "/ai/ats-upload",
                formData
            );

            const extractedText = response.data.resumeText;

            setAiAnalysis(response.data.analysis);

            if (!extractedText || !extractedText.trim()) {
                throw new Error("No readable text found in resume.");
            }

            setResumeText(extractedText);
            setScanned(true);

        } catch (error) {
            console.error("ATS Upload Error:", error);

            setUploadError(
                error.response?.data?.message ||
                error.message ||
                "Failed to analyze resume. Please try again."
            );

        } finally {
            setIsAnalyzing(false);
        }
    };


    const score = scanned && aiAudit ? aiAudit.score : null;
    const hasRealTextAudit = scanned && Boolean(resumeText.trim()) && Boolean(aiAudit);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <Navbar />

            <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pt-20 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
                            <ShieldCheck size={15} /> Evidence-based ATS compatibility
                        </div>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
                            Know exactly how your resume will <span className="text-indigo-600 dark:text-indigo-400">parse</span>.
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                            Upload any resume and get a transparent ATS compatibility audit. Add a job description for role-specific keyword and requirement analysis.
                        </p>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-[1.15fr_.85fr]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 sm:p-7">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Step 01</p>
                                    <h2 className="mt-1 text-xl font-bold">Upload your resume</h2>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">PDF, DOCX or TXT · any resume accepted</p>
                                </div>
                                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"><FileCheck2 size={20} /></div>
                            </div>

                            <div
                                onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(event) => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files?.[0]); }}
                                className={`mt-6 rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-10 ${dragging ? "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30" : "border-slate-200 bg-slate-50/70 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950/40"}`}
                            >
                                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-300">
                                    <Upload size={23} />
                                </div>
                                <h3 className="mt-4 text-sm font-bold">Drop your resume here</h3>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">or choose a file from your computer</p>
                                <button onClick={() => inputRef.current?.click()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                                    <FileText size={15} /> Choose Resume
                                </button>
                                <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} />
                            </div>

                            {file && (
                                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/60">
                                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"><Check size={18} /></div>
                                    <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{file.name}</p><p className="text-[10px] text-slate-500">{formatBytes(file.size)} · {resumeText ? "Text available for local audit" : "Ready for analysis engine"}</p></div>
                                    <button onClick={removeFile} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"><X size={15} /></button>
                                </div>
                            )}

                            {file && !resumeText && (
                                <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
                                    <Info size={16} className="mt-0.5 shrink-0" />
                                    <p className="text-xs leading-5"><strong>File received.</strong> PDF/DOCX text extraction belongs to the analysis engine. This frontend never invents a score from an unreadable file. The production parser will process it once the backend is connected.</p>
                                </div>
                            )}

                            {uploadError && (
                                <div className="mt-4 flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300">
                                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                    <p className="text-xs leading-5">{uploadError}</p>
                                </div>
                            )}

                            <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400"><Lock size={12} /> Your file is used only for this check in the current frontend build.</div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70 sm:p-7">
                            <div className="flex items-start justify-between gap-4">
                                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Step 02 · Optional</p><h2 className="mt-1 text-xl font-bold">Add the target job</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Unlock role-specific keyword analysis</p></div>
                                <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300"><Target size={20} /></div>
                            </div>
                            <textarea value={jobDescription} onChange={(event) => { setJobDescription(event.target.value); setScanned(false); }} rows={12} placeholder="Paste the job description here…\n\nExample: React, TypeScript, Node.js, REST APIs, AWS, testing, CI/CD" className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950/50 dark:text-white" />
                            <div className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-slate-500 dark:text-slate-400"><Search size={13} className="mt-0.5 shrink-0 text-indigo-500" /> Without a JD, ResuMind can audit general ATS compatibility. With a JD, it can evaluate keyword and requirement alignment.</div>
                            <button
                                onClick={runAudit}
                                disabled={!file || isAnalyzing}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Extracting & Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Analyze Resume <ArrowRight size={15} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {scanned && (
                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    {hasRealTextAudit ? <AuditResults audit={aiAudit} hasJD={Boolean(jobDescription.trim())} showDetails={showDetails} setShowDetails={setShowDetails} /> : <PendingEngine file={file} />}
                </section>
            )}

            {!scanned && <TrustStrip />}
        </main>
    );
}

function AuditResults({ audit, hasJD, showDetails, setShowDetails }) {
    return (
        <div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">Analysis result</p><h2 className="mt-1 text-3xl font-bold tracking-tight">ATS compatibility audit</h2><p className="mt-2 text-xs text-slate-500 dark:text-slate-400">This score is derived from the resume text available in this browser. It is not a claim about a specific employer's proprietary ATS.</p></div>
                <button onClick={() => setShowDetails(!showDetails)} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold dark:border-slate-800 dark:bg-slate-900">{showDetails ? "Hide methodology" : "How we calculate"}<Info size={14} /></button>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[320px_1fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-5">
                        <ScoreRing score={audit.score} />
                        <div><p className="text-sm font-bold">{audit.label}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Compatibility based on parseability, structure, content signals and {hasJD ? "job alignment." : "general resume signals."}</p></div>
                    </div>
                    <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                        <div className="flex items-center justify-between text-xs"><span className="text-slate-500">Checks passed</span><strong>{audit.passed}/{audit.checks.length}</strong></div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${audit.score}%` }} /></div>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {audit.checks.map((check) => <CheckCard key={check.title} check={check} />)}
                </div>
            </div>

            {showDetails && <div className="mt-5 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20"><div className="flex gap-3"><BarChart3 size={18} className="mt-0.5 text-indigo-600 dark:text-indigo-400" /><div><h3 className="text-sm font-bold">Transparent methodology</h3><p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">The frontend audit uses observable signals only: standard section headings, contact fields, measurable language, bullet structure, text density, and optional JD keyword overlap. No hidden employer score is fabricated. The production backend will replace this local audit with document parsing plus the final ResuMind scoring engine.</p></div></div></div>}

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <FeedbackPanel title="Priority fixes" icon={<AlertCircle size={17} />} items={audit.issues} tone="red" empty="No major issues detected by the available checks." />
                <FeedbackPanel title="What is working" icon={<CheckCircle2 size={17} />} items={audit.strengths} tone="green" empty="No positive signals detected yet." />
            </div>

            {hasJD && <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-3"><Target size={18} className="text-indigo-500" /><div><h3 className="text-sm font-bold">Job-specific keyword alignment</h3><p className="text-xs text-slate-500 dark:text-slate-400">Only terms actually found in the supplied resume text are counted.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><KeywordGroup title="Detected" items={audit.jd.detected} good /><KeywordGroup title="Not detected" items={audit.jd.missing} /></div></div>}
        </div>
    );
}

function PendingEngine({ file }) {
    return <div className="mx-auto max-w-3xl rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-xl dark:border-amber-900/50 dark:bg-slate-900"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300"><FileText size={26} /></div><h2 className="mt-5 text-2xl font-bold">{file?.name} is ready</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">The frontend has intentionally not generated a score because this PDF/DOCX file has not been parsed yet. Once the backend document parser is connected, the same screen will show the real extracted-content audit.</p><div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold dark:border-slate-700"><Zap size={13} className="text-indigo-500" /> No fabricated score</div></div>;
}

function CheckCard({ check }) {
    const Icon = check.status === "good" ? CheckCircle2 : check.status === "warn" ? AlertCircle : X;
    return <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold">{check.title}</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{check.detail}</p></div><Icon size={17} className={check.status === "good" ? "text-emerald-500" : check.status === "warn" ? "text-amber-500" : "text-rose-500"} /></div><div className="mt-4 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Weight</span><span className="text-xs font-bold">{check.points}/{check.max}</span></div></div>;
}

function FeedbackPanel({ title, icon, items, tone, empty }) {
    const classes = tone === "red" ? "border-rose-200 dark:border-rose-900/50" : "border-emerald-200 dark:border-emerald-900/50";
    return <div className={`rounded-3xl border bg-white p-6 dark:bg-slate-900 ${classes}`}><div className="flex items-center gap-2 text-sm font-bold">{icon}{title}</div><div className="mt-5 space-y-3">{items.length ? items.map((item, index) => <div key={`${item.title}-${index}`} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60"><p className="text-xs font-bold">{item.title}</p><p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{item.detail}</p><p className="mt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">How to improve → {item.fix}</p></div>) : <p className="text-xs text-slate-500">{empty}</p>}</div></div>;
}

function KeywordGroup({ title, items, good }) {
    return <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p><div className="mt-3 flex flex-wrap gap-2">{items.length ? items.map((item) => <span key={item} className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold ${good ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300" : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"}`}>{item}</span>) : <span className="text-[10px] text-slate-400">None detected</span>}</div></div>;
}

function ScoreRing({ score }) {
    return <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#4f46e5 ${score * 3.6}deg, #e2e8f0 ${score * 3.6}deg)` }}><div className="grid h-20 w-20 place-items-center rounded-full bg-white dark:bg-slate-900"><span className="text-2xl font-black">{score}</span><span className="-mt-1 text-[8px] font-bold uppercase tracking-wider text-slate-400">/ 100</span></div></div>;
}

function TrustStrip() {
    return <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="grid gap-4 sm:grid-cols-3"><Trust icon={<ShieldCheck size={18} />} title="Transparent scoring" text="Every score is tied to observable resume signals." /><Trust icon={<FileCheck2 size={18} />} title="Any resume" text="The checker is not limited to resumes made in ResuMind." /><Trust icon={<Sparkles size={18} />} title="Actionable feedback" text="Low scores surface prioritized fixes, not generic advice." /></div></section>;
}

function Trust({ icon, title, text }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-3"><div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">{icon}</div><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[10px] leading-5 text-slate-500 dark:text-slate-400">{text}</p></div></div></div>; }

function analyzeText(text, jd) {
    const clean = text.replace(/\s+/g, " ").trim();
    const lower = clean.toLowerCase();
    const words = clean.split(/\s+/).filter(Boolean);
    const checks = [];
    const add = (title, max, points, detail) => checks.push({ title, max, points, status: points >= max * 0.8 ? "good" : points >= max * 0.55 ? "warn" : "bad", detail });

    const contact = [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(clean), /(?:\+?\d[\d\s().-]{7,}\d)/.test(clean), /\b(linkedin|github|portfolio)\b/i.test(clean)].filter(Boolean).length;
    add("Contact information", 15, contact * 5, contact === 3 ? "Email, phone and a professional link were detected." : "One or more standard contact signals are missing or unclear.");

    const headings = REQUIRED_HEADINGS.filter(([, regex]) => regex.test(clean)).length;
    add("Standard sections", 20, Math.round((headings / 3) * 20), headings === 3 ? "Experience, Education and Skills are clearly identifiable." : `${headings}/3 core ATS sections detected.`);

    const bullets = (clean.match(/[•●▪◦]/g) || []).length + (clean.match(/\b(built|developed|designed|led|created|implemented|optimized|improved|increased|reduced)\b/gi) || []).length;
    const bulletPoints = Math.min(20, Math.round((bullets / 10) * 20));
    add("Impact language", 20, bulletPoints, bullets >= 10 ? "Strong action-oriented language was detected." : "Add more action verbs and outcome-oriented bullets.");

    const measurable = (clean.match(/\b\d+(?:\.\d+)?\s*(?:%|percent|x|k|m|million|thousand)?\b/gi) || []).length;
    add("Measurable outcomes", 15, Math.min(15, measurable * 3), measurable ? `${measurable} measurable numeric signal${measurable === 1 ? "" : "s"} detected.` : "No clear numeric outcomes were detected.");

    const density = words.length;
    add("Content density", 15, density >= 350 && density <= 1200 ? 15 : density >= 220 ? 10 : 5, `${density} words detected. Extremely sparse or overly dense resumes can be harder to parse and scan.`);

    const formattingSignals = [/[|]/.test(clean), /\t/.test(text), /[A-Z][a-z]+\s+[A-Z][a-z]+\s+\d{4}/.test(clean)].filter(Boolean).length;
    add("Machine-readable structure", 15, Math.max(5, 15 - formattingSignals * 2), formattingSignals ? "Some layout-dependent signals need a document-level parser to verify safely." : "No obvious text-level parsing hazards detected.");

    let score = Math.round(checks.reduce((sum, item) => sum + item.points, 0));
    const issues = [];
    const strengths = [];
    checks.forEach((check) => {
        if (check.status !== "good") issues.push(issueFor(check));
        else strengths.push({ title: check.title, detail: check.detail });
    });

    const jdResult = keywordAnalysis(clean, jd);
    if (jdResult.enabled) {
        const jdScore = jdResult.total ? Math.round((jdResult.detected.length / jdResult.total) * 20) : 0;
        score = Math.round((score * 0.8) + jdScore);
        if (jdResult.missing.length) issues.push({ title: "Target-job keywords", detail: `${jdResult.missing.length} meaningful job-description terms were not detected in the resume text.`, fix: "Only add missing terms that accurately describe your real skills or experience." });
        else strengths.push({ title: "Target-job keywords", detail: "All extracted high-signal job terms were detected in the resume text." });
    }

    score = Math.max(0, Math.min(100, score));
    return { score, label: score >= 85 ? "Strong compatibility" : score >= 70 ? "Good, with improvements" : score >= 55 ? "Needs improvement" : "High-risk for ATS parsing", checks, passed: checks.filter((x) => x.status === "good").length, issues, strengths, jd: jdResult };
}

function issueFor(check) {
    const map = {
        "Contact information": { title: "Contact details are incomplete", fix: "Use a plain-text email, phone number and one professional profile URL." },
        "Standard sections": { title: "Core sections are unclear", fix: "Use conventional headings such as Experience, Education and Skills." },
        "Impact language": { title: "Experience bullets need stronger action language", fix: "Start bullets with specific actions and describe the outcome." },
        "Measurable outcomes": { title: "Too few measurable outcomes", fix: "Add metrics such as %, time saved, users served, revenue, scale or performance improvements where truthful." },
        "Content density": { title: "Resume content density needs attention", fix: "Remove filler while keeping enough evidence of relevant experience." },
        "Machine-readable structure": { title: "Some structure signals are ambiguous", fix: "Prefer standard headings and simple text flow; avoid relying on visual positioning alone." },
    };
    return { ...map[check.title], detail: check.detail };
}

function keywordAnalysis(text, jd) {
    if (!jd.trim()) return { enabled: false, detected: [], missing: [], total: 0 };
    const terms = [...new Set(jd.toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g)?.filter((term) => !STOP_WORDS.has(term) && !/^\d+$/.test(term)) || [])];
    const detected = terms.filter((term) => text.toLowerCase().includes(term));
    return { enabled: true, detected: detected.slice(0, 24), missing: terms.filter((term) => !detected.includes(term)).slice(0, 24), total: terms.length };
}

function formatBytes(bytes) {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

export default ATSChecker;
