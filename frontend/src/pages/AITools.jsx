import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileCheck2,
  FileText,
  Lightbulb,
  Loader2,
  MessageSquareText,
  Sparkles,
  Target,
  WandSparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    id: "copilot",
    title: "AI Copilot",
    description:
      "Get intelligent suggestions while building and improving your resume.",
    icon: Bot,
    tag: "Build smarter",
  },
  {
    id: "bullet",
    title: "Bullet Improver",
    description:
      "Turn weak responsibilities into concise, impact-focused resume bullets.",
    icon: WandSparkles,
    tag: "Increase impact",
  },
  {
    id: "analyzer",
    title: "Resume Analyzer",
    description:
      "Identify content gaps, weak sections, vague language and improvement areas.",
    icon: FileCheck2,
    tag: "Find weaknesses",
  },
  {
    id: "jd",
    title: "JD Analyzer",
    description:
      "Paste a job description and extract skills, requirements and important keywords.",
    icon: FileText,
    tag: "Understand the role",
  },
  {
    id: "skills",
    title: "Skills Intelligence",
    description:
      "Discover relevant skills and identify gaps between your profile and target roles.",
    icon: Lightbulb,
    tag: "Find skill gaps",
  },
  {
    id: "match",
    title: "Job Match",
    description:
      "Compare your resume against a target job and understand your alignment.",
    icon: Target,
    tag: "Match your resume",
  },
  {
    id: "onepage",
    title: "One-Page AI",
    description:
      "Intelligently prioritize and compact your resume without destroying important content.",
    icon: FileText,
    tag: "Fit one page",
  },
  {
    id: "optimize",
    title: "Optimize Resume",
    description:
      "Improve your resume's clarity, impact, structure and overall presentation.",
    icon: Sparkles,
    tag: "Polish everything",
  },
];

const demoResults = {
  copilot: {
    title: "AI Copilot",
    text: "Your resume can be strengthened by making the summary more specific and adding measurable outcomes to your experience bullets.",
    points: [
      "Add measurable impact where possible",
      "Use role-specific terminology",
      "Remove generic phrases",
    ],
  },
  bullet: {
    title: "Bullet Improver",
    text: "Select a weak bullet and turn it into an action-oriented accomplishment statement.",
    points: [
      "Start with a strong action verb",
      "Add measurable results",
      "Highlight the technology or method used",
    ],
  },
  analyzer: {
    title: "Resume Analyzer",
    text: "A complete resume analysis will evaluate structure, content quality, clarity and ATS compatibility.",
    points: [
      "Section completeness",
      "Content strength",
      "Formatting and readability",
    ],
  },
  jd: {
    title: "JD Analyzer",
    text: "Paste a job description to extract the skills and requirements that matter most for the role.",
    points: [
      "Required technical skills",
      "Preferred qualifications",
      "Important keywords",
    ],
  },
  skills: {
    title: "Skills Intelligence",
    text: "Skills Intelligence will compare your current skill set with the requirements of your target role.",
    points: [
      "Relevant skills",
      "Potential skill gaps",
      "Role-specific recommendations",
    ],
  },
  match: {
    title: "Job Match",
    text: "Compare your resume against a specific job description to understand your alignment.",
    points: [
      "Experience alignment",
      "Keyword coverage",
      "Missing requirements",
    ],
  },
  onepage: {
    title: "One-Page AI",
    text: "One-Page AI prioritizes high-value content and removes unnecessary repetition while preserving important information.",
    points: [
      "Prioritize relevant experience",
      "Reduce repetitive wording",
      "Keep important achievements",
    ],
  },
  optimize: {
    title: "Optimize Resume",
    text: "Optimize Resume will review the entire document and identify the highest-impact improvements.",
    points: [
      "Improve wording",
      "Strengthen accomplishments",
      "Improve overall consistency",
    ],
  },
};

function AITools() {
  const [activeTool, setActiveTool] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const openTool = (tool) => {
    setActiveTool(tool);
    setInput("");
  };

  const closeTool = () => {
    if (loading) return;
    setActiveTool(null);
    setInput("");
  };

  const runTool = async () => {
    if (!input.trim()) return;

    setLoading(true);

    // Frontend-only placeholder.
    // Real AI API will be connected in the backend phase.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setLoading(false);
  };

  const result = activeTool ? demoResults[activeTool.id] : null;

  return (
    <main className="ai-page"> 
      <style>{styles}</style>

      <section className="ai-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-content">
          <div className="ai-badge">
            <Sparkles size={14} />
            ResuMind Intelligence
          </div>

          <h1>
            Build a stronger resume
            <span> with AI.</span>
          </h1>

          <p>
            A complete suite of AI-powered tools designed to help you write,
            analyze, optimize and tailor your resume for the jobs you want.
          </p>

          <div className="hero-actions">
            <Link to="/builder" className="primary-btn">
              Open Resume Builder
              <ArrowRight size={16} />
            </Link>

            <Link to="/ats-checker" className="secondary-btn">
              Check ATS Score
            </Link>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AI TOOLKIT</p>
            <h2>Everything you need to improve your resume</h2>
          </div>

          <span className="tool-count">
            {tools.length} AI tools
          </span>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.id}
                className="tool-card"
                onClick={() => openTool(tool)}
              >
                <div className="tool-card-top">
                  <div className="tool-icon">
                    <Icon size={19} />
                  </div>

                  <span className="tool-tag">{tool.tag}</span>
                </div>

                <div className="tool-card-body">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>

                <div className="tool-card-footer">
                  <span>Open tool</span>
                  <ArrowRight size={15} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="workflow-section">
        <div className="workflow-card">
          <div className="workflow-icon">
            <MessageSquareText size={22} />
          </div>

          <div>
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>Give ResuMind context. Get actionable improvements.</h2>
            <p>
              The AI tools are designed around your actual resume and target
              role rather than generic resume advice.
            </p>
          </div>

          <div className="workflow-steps">
            <div>
              <span>01</span>
              <strong>Add your resume</strong>
              <small>Use your existing resume or build one.</small>
            </div>

            <div>
              <span>02</span>
              <strong>Choose an AI tool</strong>
              <small>Analyze, improve or optimize specific areas.</small>
            </div>

            <div>
              <span>03</span>
              <strong>Apply the changes</strong>
              <small>Use the recommendations in your resume.</small>
            </div>
          </div>
        </div>
      </section>

      {activeTool && (
        <div className="modal-backdrop" onMouseDown={closeTool}>
          <div
            className="ai-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title">
                <div className="modal-icon">
                  <Sparkles size={17} />
                </div>

                <div>
                  <span>ResuMind AI</span>
                  <h3>{activeTool.title}</h3>
                </div>
              </div>

              <button
                className="close-btn"
                onClick={closeTool}
                disabled={loading}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-content">
              <p className="modal-description">
                {activeTool.description}
              </p>

              {activeTool.id === "jd" ||
                activeTool.id === "match" ||
                activeTool.id === "skills" ? (
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Paste your job description here..."
                  rows={8}
                />
              ) : (
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                    activeTool.id === "bullet"
                      ? "Paste the resume bullet you want to improve..."
                      : "Paste your resume content or the text you want ResuMind AI to analyze..."
                  }
                  rows={8}
                />
              )}

              <button
                className="run-ai-btn"
                onClick={runTool}
                disabled={!input.trim() || loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    Preparing analysis...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Run {activeTool.title}
                  </>
                )}
              </button>

              {!loading && input.trim() && (
                <div className="preview-result">
                  <div className="result-head">
                    <div>
                      <span>Preview</span>
                      <strong>{result.title}</strong>
                    </div>

                    <span className="frontend-label">
                      Frontend preview
                    </span>
                  </div>

                  <p>{result.text}</p>

                  <div className="result-points">
                    {result.points.map((point) => (
                      <div key={point}>
                        <CheckCircle2 size={14} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="backend-note">
                    <Sparkles size={14} />
                    Real AI analysis will be connected through the ResuMind
                    backend.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = `
.ai-page{
  min-height:100vh;
  background:
    radial-gradient(circle at 15% 0%,rgba(99,102,241,.14),transparent 30%),
    radial-gradient(circle at 90% 15%,rgba(168,85,247,.10),transparent 28%),
    #070914;
  color:#e2e8f0;
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}

.ai-hero{
  position:relative;
  overflow:hidden;
  min-height:480px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:90px 24px 75px;
  border-bottom:1px solid rgba(148,163,184,.10);
}

.hero-content{
  position:relative;
  z-index:2;
  max-width:850px;
  text-align:center;
}

.hero-glow{
  position:absolute;
  border-radius:999px;
  filter:blur(90px);
  pointer-events:none;
}

.hero-glow-one{
  width:300px;
  height:300px;
  background:rgba(99,102,241,.16);
  top:-150px;
  left:10%;
}

.hero-glow-two{
  width:280px;
  height:280px;
  background:rgba(168,85,247,.12);
  right:5%;
  bottom:-160px;
}

.ai-badge{
  width:max-content;
  margin:0 auto 20px;
  padding:8px 12px;
  display:flex;
  align-items:center;
  gap:7px;
  border:1px solid rgba(129,140,248,.22);
  border-radius:999px;
  background:rgba(99,102,241,.08);
  color:#c4b5fd;
  font-size:11px;
  font-weight:800;
}

.hero-content h1{
  margin:0;
  font-size:clamp(42px,6vw,70px);
  line-height:1.02;
  letter-spacing:-.055em;
  font-weight:800;
}

.hero-content h1 span{
  display:block;
  color:#818cf8;
}

.hero-content>p{
  max-width:650px;
  margin:24px auto 0;
  color:#94a3b8;
  font-size:15px;
  line-height:1.75;
}

.hero-actions{
  display:flex;
  justify-content:center;
  gap:10px;
  margin-top:30px;
}

.primary-btn,
.secondary-btn{
  min-height:44px;
  padding:0 17px;
  border-radius:11px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  text-decoration:none;
  font-size:12px;
  font-weight:800;
  transition:.2s ease;
}

.primary-btn{
  color:white;
  background:linear-gradient(135deg,#6366f1,#4f46e5);
  box-shadow:0 14px 35px rgba(79,70,229,.22);
}

.primary-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 18px 40px rgba(79,70,229,.34);
}

.secondary-btn{
  color:#cbd5e1;
  border:1px solid rgba(148,163,184,.16);
  background:rgba(15,23,42,.65);
}

.secondary-btn:hover{
  border-color:rgba(129,140,248,.4);
  color:white;
  transform:translateY(-2px);
}

.tools-section{
  max-width:1180px;
  margin:0 auto;
  padding:70px 24px;
}

.section-heading{
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:20px;
  margin-bottom:25px;
}

.eyebrow{
  margin:0 0 7px;
  color:#64748b;
  font-size:9px;
  letter-spacing:.16em;
  font-weight:900;
}

.section-heading h2,
.workflow-card h2{
  margin:0;
  color:#f8fafc;
  font-size:27px;
  line-height:1.15;
  letter-spacing:-.035em;
}

.tool-count{
  color:#94a3b8;
  border:1px solid rgba(148,163,184,.12);
  background:rgba(15,23,42,.55);
  padding:7px 10px;
  border-radius:8px;
  font-size:10px;
  font-weight:700;
}

.tools-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:12px;
}

.tool-card{
  min-height:245px;
  padding:17px;
  border:1px solid rgba(148,163,184,.11);
  border-radius:15px;
  background:linear-gradient(145deg,rgba(15,23,42,.80),rgba(9,13,27,.78));
  color:#e2e8f0;
  text-align:left;
  cursor:pointer;
  transition:.22s ease;
  display:flex;
  flex-direction:column;
}

.tool-card:hover{
  transform:translateY(-5px);
  border-color:rgba(129,140,248,.38);
  background:linear-gradient(145deg,rgba(30,41,59,.86),rgba(15,23,42,.88));
  box-shadow:0 20px 45px rgba(0,0,0,.25);
}

.tool-card-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.tool-icon{
  width:38px;
  height:38px;
  display:grid;
  place-items:center;
  border-radius:10px;
  color:#a5b4fc;
  background:rgba(99,102,241,.10);
  border:1px solid rgba(129,140,248,.18);
}

.tool-tag{
  color:#64748b;
  font-size:8px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:.07em;
}

.tool-card-body{
  margin-top:22px;
}

.tool-card-body h3{
  margin:0;
  font-size:15px;
  letter-spacing:-.02em;
}

.tool-card-body p{
  margin:9px 0 0;
  color:#64748b;
  font-size:11px;
  line-height:1.65;
}

.tool-card-footer{
  margin-top:auto;
  padding-top:20px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:#818cf8;
  font-size:10px;
  font-weight:800;
}

.workflow-section{
  max-width:1180px;
  margin:0 auto;
  padding:0 24px 80px;
}

.workflow-card{
  padding:28px;
  border:1px solid rgba(148,163,184,.11);
  border-radius:18px;
  background:linear-gradient(135deg,rgba(15,23,42,.78),rgba(9,13,27,.72));
  display:grid;
  grid-template-columns:auto 1fr;
  gap:15px 18px;
}

.workflow-icon{
  width:45px;
  height:45px;
  border-radius:12px;
  display:grid;
  place-items:center;
  color:#c4b5fd;
  background:rgba(99,102,241,.10);
  border:1px solid rgba(129,140,248,.18);
}

.workflow-card>div:nth-child(2)>p:last-child{
  max-width:700px;
  margin:9px 0 0;
  color:#64748b;
  font-size:12px;
  line-height:1.6;
}

.workflow-steps{
  grid-column:1/-1;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px;
  margin-top:12px;
}

.workflow-steps>div{
  padding:15px;
  border:1px solid rgba(148,163,184,.09);
  border-radius:11px;
  background:rgba(2,6,23,.25);
}

.workflow-steps span{
  display:block;
  color:#818cf8;
  font-size:9px;
  font-weight:900;
  margin-bottom:8px;
}

.workflow-steps strong{
  display:block;
  font-size:11px;
}

.workflow-steps small{
  display:block;
  color:#64748b;
  margin-top:5px;
  font-size:9px;
  line-height:1.5;
}

.modal-backdrop{
  position:fixed;
  inset:0;
  z-index:100;
  padding:20px;
  display:grid;
  place-items:center;
  background:rgba(2,6,23,.75);
  backdrop-filter:blur(12px);
}

.ai-modal{
  width:min(650px,100%);
  max-height:90vh;
  overflow:auto;
  border:1px solid rgba(129,140,248,.22);
  border-radius:18px;
  background:#0c1221;
  box-shadow:0 30px 100px rgba(0,0,0,.55);
}

.modal-header{
  padding:17px 18px;
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  border-bottom:1px solid rgba(148,163,184,.10);
}

.modal-title{
  display:flex;
  gap:10px;
}

.modal-icon{
  width:34px;
  height:34px;
  border-radius:9px;
  display:grid;
  place-items:center;
  color:#c4b5fd;
  background:rgba(99,102,241,.12);
}

.modal-title span{
  display:block;
  color:#64748b;
  font-size:8px;
  text-transform:uppercase;
  letter-spacing:.12em;
  font-weight:900;
}

.modal-title h3{
  margin:3px 0 0;
  font-size:15px;
}

.close-btn{
  border:0;
  background:none;
  color:#64748b;
  cursor:pointer;
}

.close-btn:hover{
  color:#f8fafc;
}

.modal-content{
  padding:18px;
}

.modal-description{
  margin:0 0 13px;
  color:#94a3b8;
  font-size:11px;
  line-height:1.6;
}

.modal-content textarea{
  width:100%;
  resize:vertical;
  min-height:160px;
  box-sizing:border-box;
  padding:12px;
  border:1px solid rgba(148,163,184,.13);
  border-radius:11px;
  outline:none;
  background:#080c18;
  color:#e2e8f0;
  font:500 11px/1.6 inherit;
}

.modal-content textarea:focus{
  border-color:rgba(129,140,248,.65);
  box-shadow:0 0 0 3px rgba(99,102,241,.08);
}

.run-ai-btn{
  width:100%;
  height:42px;
  margin-top:10px;
  border:0;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:7px;
  color:white;
  background:linear-gradient(135deg,#6366f1,#4f46e5);
  font-size:11px;
  font-weight:800;
  cursor:pointer;
}

.run-ai-btn:disabled{
  opacity:.5;
  cursor:not-allowed;
}

.preview-result{
  margin-top:15px;
  padding:15px;
  border:1px solid rgba(129,140,248,.17);
  border-radius:12px;
  background:rgba(99,102,241,.045);
}

.result-head{
  display:flex;
  justify-content:space-between;
  gap:10px;
  align-items:flex-start;
}

.result-head span{
  display:block;
  color:#64748b;
  font-size:8px;
  text-transform:uppercase;
  letter-spacing:.1em;
  font-weight:900;
}

.result-head strong{
  display:block;
  margin-top:3px;
  font-size:11px;
}

.frontend-label{
  color:#a5b4fc!important;
  background:rgba(99,102,241,.08);
  border:1px solid rgba(129,140,248,.18);
  border-radius:6px;
  padding:5px 7px;
  text-transform:none!important;
  letter-spacing:0!important;
}

.preview-result>p{
  color:#94a3b8;
  font-size:10px;
  line-height:1.6;
  margin:12px 0;
}

.result-points{
  display:grid;
  gap:7px;
}

.result-points>div{
  display:flex;
  align-items:center;
  gap:7px;
  color:#cbd5e1;
  font-size:10px;
}

.result-points svg{
  color:#34d399;
  flex:0 0 auto;
}

.backend-note{
  margin-top:13px;
  padding:9px;
  border-radius:8px;
  background:rgba(15,23,42,.65);
  color:#64748b;
  display:flex;
  align-items:flex-start;
  gap:7px;
  font-size:9px;
  line-height:1.5;
}

.backend-note svg{
  color:#a5b4fc;
  flex:0 0 auto;
}

.spin{
  animation:spin .8s linear infinite;
}

@keyframes spin{
  to{transform:rotate(360deg)}
}

@media(max-width:900px){
  .tools-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:620px){
  .ai-hero{
    min-height:420px;
    padding:70px 18px;
  }

  .hero-content h1{
    font-size:43px;
  }

  .hero-content>p{
    font-size:13px;
  }

  .hero-actions{
    flex-direction:column;
  }

  .primary-btn,
  .secondary-btn{
    width:100%;
  }

  .tools-section{
    padding:50px 18px;
  }

  .section-heading{
    align-items:flex-start;
    flex-direction:column;
  }

  .tools-grid{
    grid-template-columns:1fr;
  }

  .workflow-section{
    padding:0 18px 55px;
  }

  .workflow-card{
    grid-template-columns:1fr;
  }

  .workflow-steps{
    grid-template-columns:1fr;
  }
}
`;

export default AITools;