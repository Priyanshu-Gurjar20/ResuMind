import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Crown,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, elegant and whitespace-focused.",
    type: "Minimal",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Strong two-column layout for modern tech roles.",
    type: "Modern",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium corporate style with formal hierarchy.",
    type: "Executive",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold visual layout for design and creative roles.",
    type: "Creative",
  },
  {
    id: "classic",
    name: "Classic ATS",
    description: "Dense professional single-column ATS layout.",
    type: "Classic ATS",
    popular: true,
  },
];

export default function Templates() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#070910] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#080b13]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br from-violet-500 to-indigo-600 font-black shadow-lg shadow-violet-500/20">
              R
            </div> 

            <span className="font-black tracking-tight">ResuMind</span>
          </div>

          <button
            onClick={() => navigate("/builder?template=minimal")}
            className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Open Builder
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-14 pt-20 text-center lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-4 py-2 text-[11px] font-bold text-violet-300">
            <Sparkles size={14} />
            RESUMIND TEMPLATE STUDIO
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-6xl">
            Choose your{" "}
            <span className="text-violet-400">resume identity.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Every template has a different structure, typography and visual
            hierarchy. Pick the one that matches the role you want.
          </p>
        </div>
      </section>

      {/* TEMPLATE GRID */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={() =>
                navigate(`/builder?template=${template.id}`)
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function TemplateCard({ template, onUse }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-[#0d111a] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,.35)] ${template.popular
          ? "border-violet-400/25"
          : "border-white/[0.07]"
        }`}
    >
      {/* BADGE */}
      {template.popular && (
        <div className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[9px] font-black text-violet-300">
          <Crown size={10} />
          POPULAR
        </div>
      )} 

      {/* PREVIEW */}
      <div className="flex h-[470px] items-center justify-center overflow-hidden rounded-xl bg-[#171c27] p-5">
        <TemplatePreview type={template.type} />
      </div>

      {/* INFO */}
      <div className="px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{template.name}</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {template.description}
            </p>
          </div>

          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-slate-500">
            <LayoutTemplate size={15} />
          </div>
        </div>

        <button
          onClick={onUse}
          className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-xs font-black text-slate-900 transition group-hover:bg-violet-500 group-hover:text-white"
        >
          Use Template
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   DIFFERENT TEMPLATE PREVIEWS
========================================================= */

function TemplatePreview({ type }) {
  if (type === "Modern") {
    return (
      <div className="flex h-full w-[300px] overflow-hidden bg-white text-slate-900 shadow-2xl">
        <div className="w-[88px] bg-[#172554] p-3 text-white">
          <div className="mx-auto h-12 w-12 rounded-full bg-white/20" />

          <div className="mt-5 h-1.5 w-10 rounded bg-white/80" />

          <MiniLines count={5} dark />

          <div className="mt-5 h-1.5 w-12 rounded bg-white/80" />

          <MiniLines count={4} dark />
        </div>

        <div className="flex-1 p-5">
          <div className="h-4 w-32 rounded bg-slate-800" />
          <div className="mt-2 h-2 w-24 rounded bg-indigo-500" />

          <PreviewSection />
          <PreviewSection />
          <PreviewSection />
          <PreviewSection />
        </div>
      </div>
    );
  }

  if (type === "Executive") {
    return (
      <div className="h-full w-[300px] bg-[#fffdf8] px-7 py-8 text-slate-900 shadow-2xl">
        <div className="text-center">
          <div className="font-serif text-2xl font-bold tracking-wide">
            ALEX MORGAN
          </div>

          <div className="mt-2 text-[7px] uppercase tracking-[.25em] text-slate-500">
            Software Engineering Leader
          </div>

          <div className="mx-auto mt-4 h-px w-full bg-slate-300" />
        </div>

        <div className="mt-6">
          <ExecutiveSection title="Executive Profile" />
          <ExecutiveSection title="Professional Experience" />
          <ExecutiveSection title="Selected Achievements" />
          <ExecutiveSection title="Education" />
        </div>
      </div>
    );
  }

  if (type === "Creative") {
    return (
      <div className="flex h-full w-[300px] overflow-hidden bg-white text-slate-900 shadow-2xl">
        <div className="w-[105px] bg-gradient-to-b from-fuchsia-700 to-violet-900 p-4 text-white">
          <div className="h-14 w-14 rounded-xl border-2 border-white/30 bg-white/10" />

          <div className="mt-6 text-[7px] font-black uppercase tracking-widest">
            Contact
          </div>

          <MiniLines count={5} dark />

          <div className="mt-6 text-[7px] font-black uppercase tracking-widest">
            Skills
          </div>

          <MiniLines count={6} dark />
        </div>

        <div className="flex-1 p-5">
          <div className="h-5 w-36 rounded bg-slate-900" />
          <div className="mt-2 h-2 w-20 rounded bg-fuchsia-600" />

          <div className="mt-7">
            <CreativeSection />
            <CreativeSection />
            <CreativeSection />
          </div>
        </div>
      </div>
    );
  }

  if (type === "Classic ATS") {
    return (
      <div className="h-full w-[300px] bg-white px-6 py-7 text-slate-900 shadow-2xl">
        <div className="text-center">
          <div className="text-xl font-bold">
            ALEX MORGAN
          </div>

          <div className="mt-1 text-[7px] text-slate-500">
            Software Engineer | email@example.com | +1 555 123 4567
          </div>

          <div className="mt-4 h-px bg-slate-700" />
        </div>

        <ClassicSection title="PROFESSIONAL SUMMARY" />
        <ClassicSection title="PROFESSIONAL EXPERIENCE" />
        <ClassicSection title="PROJECTS" />
        <ClassicSection title="EDUCATION" />
        <ClassicSection title="TECHNICAL SKILLS" />
      </div>
    );
  }

  /* MINIMAL */
  return (
    <div className="h-full w-[300px] bg-white px-8 py-9 text-slate-900 shadow-2xl">
      <div>
        <div className="h-5 w-36 rounded bg-slate-900" />

        <div className="mt-2 h-2 w-24 rounded bg-slate-400" />

        <div className="mt-3 text-[7px] text-slate-400">
          email@example.com · Location · Website
        </div>
      </div>

      <div className="mt-10 space-y-7">
        <MinimalSection title="Profile" />
        <MinimalSection title="Experience" />
        <MinimalSection title="Projects" />
        <MinimalSection title="Skills" />
        <MinimalSection title="Education" />
      </div>
    </div>
  );
}

/* =========================================================
   SMALL PREVIEW COMPONENTS
========================================================= */

function MiniLines({ count = 4, dark = false }) {
  return (
    <div className="mt-3 space-y-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`h-1 rounded ${dark ? "bg-white/30" : "bg-slate-200"
            }`}
          style={{ width: `${65 + (index % 3) * 10}%` }}
        />
      ))}
    </div>
  );
}

function PreviewSection() {
  return (
    <div className="mt-6">
      <div className="h-2 w-20 rounded bg-slate-800" />
      <MiniLines count={4} />
    </div>
  );
}

function ExecutiveSection({ title }) {
  return (
    <div className="mt-5">
      <div className="font-serif text-[8px] font-bold uppercase tracking-wider">
        {title}
      </div>

      <div className="mt-1.5 h-px bg-slate-300" />

      <MiniLines count={3} />
    </div>
  );
}

function CreativeSection() {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-fuchsia-600" />
        <div className="h-2 w-20 rounded bg-slate-800" />
      </div>

      <MiniLines count={4} />
    </div>
  );
}

function ClassicSection({ title }) {
  return (
    <div className="mt-5">
      <div className="border-b border-slate-700 pb-1 text-[7px] font-black uppercase tracking-wide">
        {title}
      </div>

      <div className="mt-2">
        <MiniLines count={4} />
      </div>
    </div>
  );
}

function MinimalSection({ title }) {
  return (
    <div>
      <div className="text-[8px] font-semibold tracking-wide text-slate-800">
        {title}
      </div>

      <div className="mt-2">
        <MiniLines count={4} />
      </div>
    </div>
  );
}