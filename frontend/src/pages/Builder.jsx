import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bot, Save, Check, ChevronDown, Download, FileCheck2, FileText, GraduationCap, LayoutList, Lightbulb, Link as LinkIcon, Mail, MapPin, Phone, Plus, Sparkles, Target, Trash2, WandSparkles, X, Zap } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../api/api";

const blankResume = { personal: { name: "", role: "", email: "", phone: "", location: "", website: "" }, summary: "", experience: [], projects: [], skills: [], education: [], achievements: [], certifications: [], customSections: [] };
const templateCatalog = {
  minimal: { name: "Minimal", className: "template-minimal" }, modern: { name: "Modern", className: "template-modern" }, executive: { name: "Executive", className: "template-executive" }, creative: { name: "Creative", className: "template-creative" }, classic: { name: "Classic ATS", className: "template-classic" }
};


const sectionMeta = [["personal", "Personal", FileText], ["summary", "Summary", LayoutList], ["experience", "Experience", Zap], ["projects", "Projects", FileText], ["skills", "Skills", Lightbulb], ["education", "Education", GraduationCap], ["achievements", "Achievements", Target], ["certifications", "Certifications", FileCheck2]];
const aiTools = [["copilot", "AI Copilot", "Improve as you build", Bot], ["bullet", "Bullet Improver", "Strengthen impact", WandSparkles], ["analyze", "Resume Analyzer", "Find weaknesses", FileCheck2], ["jd", "JD Analyzer", "Extract requirements", FileText], ["skills", "Skills Intelligence", "Find skill gaps", Lightbulb], ["match", "Job Match", "Match a job", Target], ["onepage", "One-Page AI", "Fit it intelligently", LayoutList], ["optimize", "Optimize Resume", "Polish everything", Sparkles]];
const addChoices = [["experience", "Experience", Zap], ["projects", "Projects", FileText], ["education", "Education", GraduationCap], ["skills", "Skills", Lightbulb], ["achievements", "Achievement", Target], ["certifications", "Certification", FileCheck2], ["custom", "Custom section", Plus]];

function Builder() {
  const [params] = useSearchParams(), navigate = useNavigate();
  const templateId = params.get("template") || "minimal";
  const [resumeId, setResumeId] = useState(params.get("resumeId"));
  const template = templateCatalog[templateId] || templateCatalog.minimal;

  const [resume, setResume] = useState(() => structuredClone(blankResume));

  useEffect(() => {
    if (!resumeId) return;

    const loadResume = async () => {
      try {
        const response = await API.get(`/resumes/${resumeId}`);

        setResume(response.data.resume.content);
      } catch (error) {
        console.error("Load Resume Error:", error);
      }
    };

    loadResume();
  }, [resumeId]);


  useEffect(() => {
    localStorage.setItem(
      "resumind-builder-current-v1",
      JSON.stringify(resume)
    );
  }, [resume]);

  const [openSection, setOpenSection] = useState("personal"),
    [aiLoading, setAiLoading] = useState(""),
    [analysisResult, setAnalysisResult] = useState(null),
    [toast, setToast] = useState(""),
    [versionModal, setVersionModal] = useState(false),

    [versionName, setVersionName] = useState(""), [jobModal, setJobModal] = useState(false), [jobDescription, setJobDescription] = useState(""), [jobMode, setJobMode] = useState("match"), [jobAnalysisResult, setJobAnalysisResult] = useState(null), [onePageMode, setOnePageMode] = useState(false), [addModal, setAddModal] = useState(false), [customName, setCustomName] = useState("");
  const update = (path, value) => setResume(cur => { const next = structuredClone(cur); let t = next; path.slice(0, -1).forEach(k => t = t[k]); t[path.at(-1)] = value; return next });
  const notify = m => { setToast(m); clearTimeout(window.__resumindToast); window.__resumindToast = setTimeout(() => setToast(""), 2400) };


  const saveVersion = async () => {
    const name = versionName.trim();

    if (!name) return;

    console.log("Editing Resume ID:", resumeId);

    try {
      const response = resumeId
        ? await API.put(`/resumes/${resumeId}`, {
          title: name,
          content: resume,
          template: templateId,
        })
        : await API.post("/resumes", {
          title: name,
          content: resume,
          template: templateId,
        });

      if (!resumeId) {
        setResumeId(response.data.resume._id);
      }

      console.log("Resume saved to backend:", response.data);

      setVersionName("");
      setVersionModal(false);
      notify("Resume saved successfully");
    } catch (error) {
      console.error("Save Resume Error:", error);

      notify(
        error.response?.data?.message ||
        "Failed to save resume"
      );
    }
  };


  const addSection = type => { setAddModal(false); if (type === "custom") { if (!customName.trim()) return; const id = crypto.randomUUID(); setResume(r => ({ ...r, customSections: [...r.customSections, { id, title: customName.trim(), items: [""] }] })); setOpenSection(`custom:${id}`); setCustomName(""); notify("Custom section added"); return; } if (type === "experience") setResume(r => ({ ...r, experience: [...r.experience, { company: "Company", role: "Role", location: "", start: "2025", end: "Present", bullets: ["Describe your impact..."] }] })); if (type === "projects") setResume(r => ({ ...r, projects: [...r.projects, { name: "New project", link: "", tech: "", bullets: ["Describe your impact..."] }] })); if (type === "education") setResume(r => ({ ...r, education: [...r.education, { school: "University", degree: "Degree", start: "2022", end: "2026", detail: "Relevant coursework, honors or details" }] })); if (type === "skills") setResume(r => ({ ...r, skills: [...r.skills, "New skill"] })); if (type === "achievements") setResume(r => ({ ...r, achievements: [...r.achievements, "New achievement"] })); if (type === "certifications") setResume(r => ({ ...r, certifications: [...r.certifications, "New certification"] })); setOpenSection(type); notify(`${addChoices.find(x => x[0] === type)?.[1] || "Section"} added`) };

  const runAI = async (tool) => {
    if (tool === "match" || tool === "jd") {
      setJobModal(true);
      return;
    }

    if (tool === "analyze") {
      setAiLoading("analyze");

      try {
        const resumeText = JSON.stringify(resume);

        const response = await API.post("/ai/analyze", {
          resumeText,
        });

        console.log("AI Resume Analysis:", response.data);

        setAnalysisResult(response.data.analysis);

        setAiLoading("");

        notify(
          `ATS Score: ${response.data.analysis.atsScore}/100`
        );
      } catch (error) {
        console.error("AI Resume Analysis Error:", error);

        setAiLoading("");

        notify(
          error.response?.data?.message ||
          "Failed to analyze resume"
        );
      }

      return;
    }


    if (tool === "optimize") {
      setAiLoading(tool);

      try {
        const response = await API.post("/ai/tool", {
          tool: "optimize",
          resumeText: JSON.stringify(resume),
        });

        const result =
          typeof response.data.result === "string"
            ? JSON.parse(response.data.result)
            : response.data.result;

        setResume((current) => ({
          ...current,
          ...result,
        }));

        notify("Resume Optimizer applied successfully");
      } catch (error) {
        console.error("Resume Optimizer Error:", error);
        notify(
          error.response?.data?.message || "Resume Optimizer failed"
        );
      } finally {
        setAiLoading("");
      }

      return;
    }

    if (tool === "bullet") {
      setAiLoading(tool);

      try {
        const response = await API.post("/ai/tool", {
          tool: "bullet",
          resumeText: JSON.stringify(resume),
        });

        const result =
          typeof response.data.result === "string"
            ? JSON.parse(response.data.result)
            : response.data.result;

        setResume((current) => ({
          ...current,
          experience: result.experience || current.experience,
          projects: result.projects || current.projects,
        }));

        notify("Bullet Improver applied successfully");
      } catch (error) {
        console.error("Bullet Improver Error:", error);
        notify(
          error.response?.data?.message || "Bullet Improver failed"
        );
      } finally {
        setAiLoading("");
      }

      return;
    }


    if (tool === "skills") {
      setAiLoading(tool);

      try {
        const response = await API.post("/ai/tool", {
          tool: "skills",
          resumeText: JSON.stringify(resume),
        });

        const result =
          typeof response.data.result === "string"
            ? JSON.parse(response.data.result)
            : response.data.result;

        const suggestedSkills = result.suggestedSkills || [];

        if (suggestedSkills.length === 0) {
          notify("No new skill suggestions found");
          return;
        }

        setResume((current) => ({
          ...current,
          skills: [
            ...new Set([
              ...(current.skills || []),
              ...suggestedSkills,
            ]),
          ],
        }));

        notify(`${suggestedSkills.length} AI skills added`);
      } catch (error) {
        console.error("Skills Intelligence Error:", error);
        notify(
          error.response?.data?.message ||
          "Skills Intelligence failed"
        );
      } finally {
        setAiLoading("");
      }

      return;
    }



    if (tool === "copilot") {

      setAiLoading(tool);

      try {
        const response = await API.post("/ai/tool", {
          tool: "copilot",
          resumeText: JSON.stringify(resume),
        });

        setResume((current) => ({
          ...current,
          summary: response.data.result,
        }));

        notify("AI Copilot applied successfully");
      } catch (error) {
        console.error("AI Copilot Error:", error);
        notify(
          error.response?.data?.message || "AI Copilot failed"
        );
      } finally {
        setAiLoading("");
      }

      return;
    }

    setAiLoading(tool);

    if (tool === "onepage") {
      setAiLoading(tool);

      try {
        const response = await API.post("/ai/tool", {
          tool: "onepage",
          resumeText: JSON.stringify(resume),
        });

        const result =
          typeof response.data.result === "string"
            ? JSON.parse(response.data.result)
            : response.data.result;

        setResume(current => ({
          ...current,
          ...result,
        }));

        setOnePageMode(true);
        notify("One-Page AI applied successfully");
      } catch (error) {
        console.error("One-Page AI Error:", error);
        notify(error.response?.data?.message || "One-Page AI failed");
      } finally {
        setAiLoading("");
      }

      return;
    }

    await new Promise(r => setTimeout(r, 650));
  };



  const runJobMatch = async (mode = "match") => {
    if (!jobDescription.trim()) {
      notify("Please enter a job description");
      return;
    }

    setAiLoading(mode);

    try {
      const response = await API.post("/ai/tool", {
        tool: mode,
        resumeText: JSON.stringify(resume),
        jobDescription,
      });

      const result =
        typeof response.data.result === "string"
          ? JSON.parse(response.data.result)
          : response.data.result;

      console.log(
        mode === "jd" ? "JD Analyzer Result:" : "Job Match Result:",
        result
      );

      setJobAnalysisResult({ mode, data: result });

      if (mode === "jd") {
        notify(
          `JD analyzed: ${result.requiredSkills?.length || 0} required skills found`
        );
      } else {
        notify(`Job Match Score: ${result.matchScore ?? "N/A"}%`);
      }
    } catch (error) {
      console.error("Job Analysis Error:", error);

      notify(
        error.response?.data?.message ||
        "Job analysis failed. Please try again."
      );
    } finally {
      setAiLoading("");
    }
  };


  const pages = useMemo(() => paginateResume(resume, onePageMode), [resume, onePageMode]);
  const allSections = [...sectionMeta, ...resume.customSections.map(s => [`custom:${s.id}`, s.title, FileText])];
  return <main className="resumind-builder"><style>{styles}</style><header className="builder-topbar"><div className="top-left"><Link to="/dashboard" className="icon-button"><ArrowLeft size={18} /></Link><div className="brand-lockup"><span>Resu</span><b>Mind</b><em>BUILDER</em></div><span className="template-pill">{template.name} template</span></div>
    <div className="top-actions">
      <span className="save-state">
        <span className="save-dot" /> Autosaved
      </span>

      <button
        className="ghost-action"
        onClick={() => setVersionModal(true)}
      >
        <Save size={16} /> Save Version
      </button>

      <button
        className="ghost-action"
        onClick={() => document.querySelector('.ai-zone')?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })}
      >
        <Sparkles size={16} /> AI Tools
      </button>

      <button
        className="primary-action"
        onClick={() => window.print()}
      >
        <Download size={16} /> Export PDF
      </button>
    </div>
  </header>
    <div className="builder-shell"><aside className="editor-panel"><div className="panel-heading"><div><p className="eyebrow">Resume workspace</p><h1>Build your resume</h1></div><span className="completion">92%</span></div><div className="completion-track"><span /></div><div className="section-list">{allSections.map(([id, label, Icon]) => <div className={`section-wrap ${openSection === id ? 'is-open' : ''}`} key={id}><button className="section-trigger" onClick={() => setOpenSection(openSection === id ? '' : id)}><span className="section-icon"><Icon size={16} /></span><span>{label}</span><ChevronDown size={16} className="section-chevron" /></button>{openSection === id && <div className="inline-editor"><SectionEditor id={id} resume={resume} update={update} onAI={() => runAI(id === 'summary' ? 'copilot' : 'optimize')} aiLoading={aiLoading} /></div>}</div>)}</div><button className="add-section-main" onClick={() => setAddModal(true)}><Plus size={15} /> Add New Section</button>
      <div className="ai-zone"><div className="ai-zone-head"><span className="ai-orb"><Sparkles size={15} /></span><div><strong>AI Studio</strong><small>One click. Resume intelligence.</small></div></div><div className="ai-grid">{aiTools.map(([id, title, sub, Icon]) => <button key={id} className="ai-tool" onClick={() => runAI(id)} disabled={!!aiLoading}><span className="ai-tool-icon"><Icon size={15} /></span><span><strong>{aiLoading === id ? 'Working…' : title}</strong><small>{sub}</small></span><span className="ai-arrow">→</span></button>)}</div></div></aside>
      <section className="preview-panel"><div className="preview-toolbar"><div><p className="eyebrow">Live preview</p><strong>{pages.length} {pages.length === 1 ? 'page' : 'pages'}</strong></div><div className="preview-actions"><button className="toolbar-button" onClick={() => setAddModal(true)}><Plus size={15} /> Add Section</button><button className="toolbar-button" onClick={() => navigate('/templates')}><LayoutList size={15} /> Templates</button><span className="page-fit">A4 · {onePageMode ? 'AI optimized' : 'Auto flow'}</span></div></div><div className="resume-stage">{pages.map((page, i) => <ResumePage key={i} resume={resume} page={page} pageNumber={i + 1} total={pages.length} templateId={templateId} />)}</div></section></div>
    {toast && <div className="toast"><span><Check size={15} /></span>{toast}</div>}
    {analysisResult && (
      <div className="modal-backdrop">
        <div className="ai-analysis-modal">

          <div className="modal-head">
            <div>
              <span className="ai-orb">
                <FileCheck2 size={15} />
              </span>

              <div>
                <strong>AI Resume Analysis</strong>
                <small>Powered by ResuMind AI</small>
              </div>
            </div>

            <button onClick={() => setAnalysisResult(null)}>
              <X size={18} />
            </button>
          </div>

          <div className="ats-score-card">
            <div
              className="ats-score"
              style={{
                "--score": `${analysisResult.atsScore}%`,
              }}
            >
              <div className="ats-score-inner">
                <strong>{analysisResult.atsScore}</strong>
                <span>/100</span>
              </div>
            </div>

            <div>
              <strong>ATS Score</strong>

              <span
                className={`ats-status ${analysisResult.atsScore < 40
                  ? "poor"
                  : analysisResult.atsScore < 60
                    ? "needs-work"
                    : analysisResult.atsScore < 80
                      ? "good"
                      : "excellent"
                  }`}
              >
                {analysisResult.atsScore < 40
                  ? "Poor"
                  : analysisResult.atsScore < 60
                    ? "Needs Work"
                    : analysisResult.atsScore < 80
                      ? "Good"
                      : "Excellent"}
              </span>

              <small>Resume compatibility score</small>
            </div>
          </div>

          <div className="analysis-section">
            <h4>Summary</h4>
            <p>{analysisResult.summary}</p>
          </div>

          <div className="analysis-section">
            <h4>Strengths</h4>

            <ul>
              {analysisResult.strengths?.map((item, index) => (
                <li key={index}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="analysis-section">
            <h4>Weaknesses</h4>

            <ul>
              {analysisResult.weaknesses?.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>


          <div className="analysis-section">
            <h4>Missing Keywords</h4>

            {analysisResult.missingKeywords?.length > 0 && (
              <button
                type="button"
                className="add-all-keywords"

                onClick={() => {
                  const missingKeywords = analysisResult.missingKeywords || [];

                  const existingSkills = resume.skills || [];

                  const existing = new Set(
                    existingSkills.map((skill) => skill.toLowerCase().trim())
                  );

                  const newSkills = missingKeywords.filter(
                    (keyword) => !existing.has(keyword.toLowerCase().trim())
                  );

                  if (newSkills.length === 0) {
                    notify("All keywords are already added");
                    return;
                  }

                  setResume((current) => {
                    const currentSkills = current.skills || [];

                    const currentSet = new Set(
                      currentSkills.map((skill) => skill.toLowerCase().trim())
                    );

                    const skillsToAdd = newSkills.filter(
                      (keyword) => !currentSet.has(keyword.toLowerCase().trim())
                    );

                    return {
                      ...current,
                      skills: [...currentSkills, ...skillsToAdd],
                    };
                  });

                  notify(`${newSkills.length} skills added successfully`);
                }}

              >
                + Add All Skills
              </button>
            )}

            <div className="analysis-tags">
              {analysisResult.missingKeywords?.map((keyword, index) => {
                const alreadyAdded = resume.skills.some(
                  (skill) => skill.toLowerCase() === keyword.toLowerCase()
                );

                return (
                  <div className="keyword-chip" key={index}>
                    <span>{keyword}</span>

                    <button
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => {
                        if (alreadyAdded) return;

                        setResume((current) => ({
                          ...current,
                          skills: [...current.skills, keyword],
                        }));

                        notify(`${keyword} added to Skills`);
                      }}
                    >
                      {alreadyAdded ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>



          <div className="analysis-section">
            <h4>AI Suggestions</h4>

            <ul>
              {analysisResult.suggestions?.map((item, index) => (
                <li key={index}>→ {item}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    )}

    {jobModal && (
      <JobMatchModal
        value={jobDescription}
        setValue={setJobDescription}
        loading={aiLoading === "match" || aiLoading === "jd"}
        onClose={() => setJobModal(false)}
        onRun={() => runJobMatch(jobMode)}
        mode={jobMode}
        setMode={setJobMode}
        jobAnalysisResult={jobAnalysisResult}
      />
    )}
    {addModal && <AddSectionModal customName={customName} setCustomName={setCustomName} onClose={() => { setAddModal(false); setCustomName("") }} onAdd={addSection} />} {versionModal && (
      <div className="modal-backdrop">
        <div className="add-modal">
          <div className="modal-head">
            <div>
              <span className="ai-orb">
                <Save size={15} />
              </span>

              <div>
                <strong>Save Resume Version</strong>
                <small>Create a snapshot you can restore later.</small>
              </div>
            </div>

            <button
              onClick={() => {
                setVersionModal(false);
                setVersionName("");
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="form-stack">
            <label className="field">
              <span>Version name</span>

              <input
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="e.g. Frontend Developer Final"
                autoFocus
              />
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "6px",
              }}
            >
              <button
                className="ghost-action"
                onClick={() => {
                  setVersionModal(false);
                  setVersionName("");
                }}
              >
                Cancel
              </button>

              <button
                className="primary-action"
                onClick={saveVersion}
                disabled={!versionName.trim()}
              >
                <Save size={15} />
                Save Version
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>
}


function SectionEditor({ id, resume, update, onAI, aiLoading }) {
  if (id === 'personal') return <div className="form-stack"><div className="field-grid"><Field label="Full name" value={resume.personal.name} onChange={v => update(['personal', 'name'], v)} /><Field label="Headline" value={resume.personal.role} onChange={v => update(['personal', 'role'], v)} /></div><div className="field-grid"><Field label="Email" value={resume.personal.email} onChange={v => update(['personal', 'email'], v)} /><Field label="Phone" value={resume.personal.phone} onChange={v => update(['personal', 'phone'], v)} /></div><div className="field-grid"><Field label="Location" value={resume.personal.location} onChange={v => update(['personal', 'location'], v)} /><Field label="Website" value={resume.personal.website} onChange={v => update(['personal', 'website'], v)} /></div></div>;
  if (id === 'summary') return <div className="form-stack"><div className="field-label-row"><label>Professional summary</label><button className="mini-ai" onClick={onAI} disabled={!!aiLoading}><Sparkles size={13} /> {aiLoading ? 'Improving…' : 'Improve with AI'}</button></div><textarea value={resume.summary} onChange={e => update(['summary'], e.target.value)} rows={6} /></div>;
  if (id === 'experience') return <EntryEditor type="experience" items={resume.experience} resume={resume} update={update} />;
  if (id === 'projects') return <EntryEditor type="projects" items={resume.projects} resume={resume} update={update} />;
  if (id === 'skills') return <div className="form-stack"><div className="field-label-row"><label>Skills</label><button className="mini-ai" onClick={() => update(['skills'], [...new Set([...resume.skills, 'Problem Solving', 'System Design'])])}><Sparkles size={13} /> Analyze with AI</button></div><textarea value={resume.skills.join(', ')} onChange={e => update(['skills'], e.target.value.split(',').map(s => s.trim()).filter(Boolean))} rows={4} /><div className="skill-chips">{resume.skills.map((s, i) => <span key={`${s}-${i}`}>{s}<button onClick={() => update(['skills'], resume.skills.filter((_, x) => x !== i))}><X size={11} /></button></span>)}</div></div>;
  if (id === 'education') return <div className="form-stack">{resume.education.map((item, i) => <div className="entry-card" key={i}><div className="entry-title"><strong>Education {i + 1}</strong><button onClick={() => update(['education'], resume.education.filter((_, x) => x !== i))}><Trash2 size={14} /></button></div><Field label="School" value={item.school} onChange={v => update(['education', i, 'school'], v)} /><Field label="Degree" value={item.degree} onChange={v => update(['education', i, 'degree'], v)} /><div className="field-grid"><Field label="Start" value={item.start} onChange={v => update(['education', i, 'start'], v)} /><Field label="End" value={item.end} onChange={v => update(['education', i, 'end'], v)} /></div><Field label="Details" value={item.detail} onChange={v => update(['education', i, 'detail'], v)} /></div>)}<button className="add-entry" onClick={() => update(['education'], [...resume.education, { school: 'University', degree: 'Degree', start: '2022', end: '2026', detail: 'Relevant coursework, honors or details' }])}><Plus size={14} /> Add education</button></div>;
  if (id === 'achievements' || id === 'certifications') return <ListEditor id={id} values={resume[id]} update={update} />;
  if (id.startsWith('custom:')) { const sid = id.slice(7), s = resume.customSections.find(x => x.id === sid); if (!s) return null; return <div className="form-stack"><Field label="Section title" value={s.title} onChange={v => update(['customSections', resume.customSections.indexOf(s), 'title'], v)} />{s.items.map((v, i) => <div className="list-edit" key={i}><input value={v} onChange={e => update(['customSections', resume.customSections.indexOf(s), 'items', i], e.target.value)} /><button onClick={() => update(['customSections', resume.customSections.indexOf(s), 'items'], s.items.filter((_, x) => x !== i))}><Trash2 size={14} /></button></div>)}<button className="add-entry" onClick={() => update(['customSections', resume.customSections.indexOf(s), 'items'], [...s.items, 'New item'])}><Plus size={14} /> Add item</button></div> }
  return null;
}
function EntryEditor({ type, items, resume, update }) { return <div className="form-stack">{items.map((item, i) => <div className="entry-card" key={i}><div className="entry-title"><strong>{type === 'experience' ? 'Experience' : 'Project'} {i + 1}</strong><button onClick={() => update([type], items.filter((_, x) => x !== i))}><Trash2 size={14} /></button></div>{type === 'experience' ? <><div className="field-grid"><Field label="Company" value={item.company} onChange={v => update([type, i, 'company'], v)} /><Field label="Role" value={item.role} onChange={v => update([type, i, 'role'], v)} /></div><div className="field-grid"><Field label="Start" value={item.start} onChange={v => update([type, i, 'start'], v)} /><Field label="End" value={item.end} onChange={v => update([type, i, 'end'], v)} /></div></> : <><Field label="Project name" value={item.name} onChange={v => update([type, i, 'name'], v)} /><Field label="Link" value={item.link} onChange={v => update([type, i, 'link'], v)} /><Field label="Technologies" value={item.tech} onChange={v => update([type, i, 'tech'], v)} /></>}{item.bullets.map((b, bi) => <BulletEdit key={bi} value={b} onChange={v => update([type, i, 'bullets', bi], v)} onImprove={() => update([type, i, 'bullets', bi], improveBullet(b))} />)}<button className="add-line" onClick={() => update([type, i, 'bullets'], [...item.bullets, 'Describe your measurable impact...'])}><Plus size={13} /> Add bullet</button></div>)}<button className="add-entry" onClick={() => update([type], [...items, type === 'experience' ? { company: 'Company', role: 'Role', location: '', start: '2025', end: 'Present', bullets: ['Describe your impact...'] } : { name: 'New project', link: '', tech: '', bullets: ['Describe your impact...'] }])}><Plus size={14} /> Add {type === 'experience' ? 'experience' : 'project'}</button></div> }
function ListEditor({ id, values, update }) { return <div className="form-stack">{values.map((v, i) => <div className="list-edit" key={i}><input value={v} onChange={e => update([id, i], e.target.value)} /><button onClick={() => update([id], values.filter((_, x) => x !== i))}><Trash2 size={14} /></button></div>)}<button className="add-entry" onClick={() => update([id], [...values, id === 'achievements' ? 'New achievement' : 'New certification'])}><Plus size={14} /> Add {id === 'achievements' ? 'achievement' : 'certification'}</button></div> }
function Field({ label, value, onChange }) { return <label className="field"><span>{label}</span><input value={value || ''} onChange={e => onChange(e.target.value)} /></label> }
function BulletEdit({ value, onChange, onImprove }) { return <div className="bullet-edit"><textarea value={value} onChange={e => onChange(e.target.value)} rows={2} /><button className="mini-ai" onClick={onImprove}><Sparkles size={12} /> Improve</button></div> }

function ResumePage({ resume, page, pageNumber, total, templateId }) { const Layout = { minimal: MinimalLayout, modern: ModernLayout, executive: ExecutiveLayout, creative: CreativeLayout, classic: ClassicLayout }[templateId] || MinimalLayout; return <article className={`a4-page template-${templateId}`}><Layout resume={resume} page={page} /><footer className="page-footer">{pageNumber} / {total}</footer></article> }
function ResumeHeader({ resume, center = false }) { return <header className={`resume-header ${center ? 'center-header' : ''}`}><div><h2>{resume.personal.name || 'Your Name'}</h2><p>{resume.personal.role || 'Professional Headline'}</p></div><div className="contact-grid"><span><Mail size={10} />{resume.personal.email}</span><span><Phone size={10} />{resume.personal.phone}</span><span><MapPin size={10} />{resume.personal.location}</span><span><LinkIcon size={10} />{resume.personal.website}</span></div></header> }
function Sections({ page, classic = false }) { return <>{page.summary && <ResumeSection title={classic ? 'PROFESSIONAL SUMMARY' : 'SUMMARY'}><p className="resume-body">{page.summary}</p></ResumeSection>}{page.experience?.length > 0 && <ResumeSection title={classic ? 'PROFESSIONAL EXPERIENCE' : 'EXPERIENCE'}>{page.experience.map((e, i) => <Entry key={`${e.company}-${i}`} title={e.role} org={e.company} date={`${e.start} — ${e.end}`} bullets={e.bullets} />)}</ResumeSection>}{page.projects?.length > 0 && <ResumeSection title="PROJECTS">{page.projects.map((p, i) => <Entry key={`${p.name}-${i}`} title={p.name} org={p.tech} date={p.link} bullets={p.bullets} />)}</ResumeSection>}{page.skills?.length > 0 && <ResumeSection title={classic ? 'TECHNICAL SKILLS' : 'SKILLS'}><p className="skills-line">{page.skills.join(' · ')}</p></ResumeSection>}{page.education?.length > 0 && <ResumeSection title="EDUCATION">{page.education.map((e, i) => <Entry key={i} title={e.degree} org={e.school} date={`${e.start} — ${e.end}`} text={e.detail} />)}</ResumeSection>}{page.achievements?.length > 0 && <ResumeSection title="ACHIEVEMENTS"><ul>{page.achievements.map((x, i) => <li key={i}>{x}</li>)}</ul></ResumeSection>}{page.certifications?.length > 0 && <ResumeSection title="CERTIFICATIONS"><ul>{page.certifications.map((x, i) => <li key={i}>{x}</li>)}</ul></ResumeSection>}{page.customSections?.map(s => <ResumeSection key={s.id} title={s.title}>{s.items.filter(Boolean).map((x, i) => <p className="resume-body custom-item" key={i}>{x}</p>)}</ResumeSection>)}</> }
function MinimalLayout({ resume, page }) { return <><ResumeHeader resume={resume} /><div className="minimal-body"><Sections page={page} /></div></> }
function ClassicLayout({ resume, page }) { return <><ResumeHeader resume={resume} center /><div className="classic-body"><Sections page={page} classic /></div></> }
function ExecutiveLayout({ resume, page }) { return <><div className="executive-head"><h2>{resume.personal.name || 'Your Name'}</h2><p>{resume.personal.role || 'Professional Headline'}</p><div className="executive-contact">{[resume.personal.email, resume.personal.phone, resume.personal.location, resume.personal.website].filter(Boolean).join(' · ')}</div></div><div className="executive-body"><Sections page={page} /></div></> }
function ModernLayout({ resume, page }) { return <div className="split-layout"><aside className="side-modern"><div className="avatar">{(resume.personal.name || 'YN').split(' ').map(x => x[0]).slice(0, 2).join('')}</div><h4>CONTACT</h4><ContactText resume={resume} />{page.skills?.length > 0 && <><h4>SKILLS</h4><div className="side-skills">{page.skills.map((x, i) => <span key={i}>{x}</span>)}</div></>}{page.education?.length > 0 && <><h4>EDUCATION</h4>{page.education.map((e, i) => <div className="side-edu" key={i}><strong>{e.degree}</strong><span>{e.school}</span></div>)}</>}</aside><div className="main-modern"><div className="modern-head"><h2>{resume.personal.name || 'Your Name'}</h2><p>{resume.personal.role || 'Professional Headline'}</p></div><Sections page={{ ...page, skills: [], education: [] }} /></div></div> }
function CreativeLayout({ resume, page }) { return <div className="split-layout creative-layout"><aside className="side-creative"><div className="creative-avatar">{(resume.personal.name || 'YN').split(' ').map(x => x[0]).slice(0, 2).join('')}</div><h4>CONTACT</h4><ContactText resume={resume} />{page.skills?.length > 0 && <><h4>SKILLS</h4><div className="side-skills">{page.skills.map((x, i) => <span key={i}>{x}</span>)}</div></>}</aside><div className="main-creative"><div className="creative-head"><h2>{resume.personal.name || 'Your Name'}</h2><p>{resume.personal.role || 'Professional Headline'}</p></div><Sections page={{ ...page, skills: [] }} /></div></div> }
function ContactText({ resume }) { return <div className="contact-text">{[resume.personal.email, resume.personal.phone, resume.personal.location, resume.personal.website].filter(Boolean).map((x, i) => <span key={i}>{x}</span>)}</div> }
function ResumeSection({ title, children }) { return <section className="resume-section"><h3>{title}</h3>{children}</section> }
function Entry({ title, org, date, bullets, text }) { return <div className="resume-entry"><div className="resume-row"><strong>{title}</strong><span>{date}</span></div>{org && <div className="muted">{org}</div>}{text && <div className="resume-body">{text}</div>}{bullets && <ul>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}</div> }
function AddSectionModal({ customName, setCustomName, onClose, onAdd }) { return <div className="modal-backdrop"><div className="add-modal"><div className="modal-head"><div><span className="ai-orb"><Plus size={15} /></span><div><strong>Add New Section</strong><small>Add content or create your own section.</small></div></div><button onClick={onClose}><X size={18} /></button></div><div className="add-choice-grid">{addChoices.map(([id, label, Icon]) => <button key={id} onClick={() => id === 'custom' ? null : onAdd(id)}><span><Icon size={16} /></span>{label}<b>+</b></button>)}</div><div className="custom-section-row"><input value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Custom section name…" /><button className="primary-action" onClick={() => onAdd('custom')} disabled={!customName.trim()}>Create</button></div></div></div> }
function JobMatchModal({
  value,
  setValue,
  loading,
  onClose,
  onRun,
  mode,
  setMode,
  jobAnalysisResult,
}) {
  return (
    <div className="modal-backdrop">
      <div className="job-modal">
        <div className="modal-head">
          <div>
            <span className="ai-orb">
              <Target size={15} />
            </span>
            <div>
              <strong>
                {mode === "jd" ? "JD Analyzer" : "Job Match"}
              </strong>
              <small>
                {mode === "jd"
                  ? "Analyze skills and qualifications in a job description."
                  : "Compare your resume with the target job."}
              </small>
            </div>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="job-mode-switch">
          <button
            className={mode === "jd" ? "primary-action" : "ghost-action"}
            onClick={() => setMode("jd")}
            disabled={loading}
          >
            JD Analyzer
          </button>

          <button
            className={mode === "match" ? "primary-action" : "ghost-action"}
            onClick={() => setMode("match")}
            disabled={loading}
          >
            Job Match
          </button>
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste job description…"
          rows={9}
        />


        {jobAnalysisResult && jobAnalysisResult.mode === mode && (
          <div className="job-analysis-results">
            {mode === "jd" ? (
              <>

                <h3>JD Analysis Results</h3>

                <div className="jd-analysis-grid">
                  <div className="jd-analysis-card jd-required">
                    <div className="jd-card-heading">
                      <span className="jd-card-icon">✓</span>
                      <h4>Required Skills</h4>
                    </div>

                    {(jobAnalysisResult.data.requiredSkills || []).length > 0 ? (
                      <div className="jd-tags">
                        {jobAnalysisResult.data.requiredSkills.map((item, i) => (
                          <span className="jd-tag" key={i}>{item}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="jd-empty">No required skills identified.</p>
                    )}
                  </div>

                  <div className="jd-analysis-card jd-preferred">
                    <div className="jd-card-heading">
                      <span className="jd-card-icon">✦</span>
                      <h4>Preferred Skills</h4>
                    </div>

                    {(jobAnalysisResult.data.preferredSkills || []).length > 0 ? (
                      <div className="jd-tags">
                        {jobAnalysisResult.data.preferredSkills.map((item, i) => (
                          <span className="jd-tag" key={i}>{item}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="jd-empty">No preferred skills identified.</p>
                    )}
                  </div>

                  <div className="jd-analysis-card">
                    <div className="jd-card-heading">
                      <span className="jd-card-icon">↗</span>
                      <h4>Responsibilities</h4>
                    </div>

                    {(jobAnalysisResult.data.responsibilities || []).length > 0 ? (
                      <ul className="jd-list">
                        {jobAnalysisResult.data.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="jd-empty">No responsibilities identified.</p>
                    )}
                  </div>

                  <div className="jd-analysis-card">
                    <div className="jd-card-heading">
                      <span className="jd-card-icon">◎</span>
                      <h4>Qualifications</h4>
                    </div>

                    {(jobAnalysisResult.data.qualifications || []).length > 0 ? (
                      <ul className="jd-list">
                        {jobAnalysisResult.data.qualifications.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="jd-empty">No qualifications identified.</p>
                    )}
                  </div>
                </div>

              </>
            ) : (
              <>
                <h3>Job Match Results</h3>

                <div className="match-score-card">
                  <div
                    className="match-score-circle"
                    style={{
                      "--match-score": `${Math.max(
                        0,
                        Math.min(
                          100,
                          Number(jobAnalysisResult.data.matchScore) || 0
                        )
                      )}%`,
                    }}
                  >
                    <div className="match-score-inner">
                      <strong>
                        {jobAnalysisResult.data.matchScore ?? "N/A"}
                      </strong>
                      <span>%</span>
                    </div>
                  </div>

                  <div className="match-score-info">
                    <h3>Resume Match Score</h3>
                    <p>
                      How closely your resume matches the target job description.
                    </p>
                    <span className="match-score-badge">
                      {Number(jobAnalysisResult.data.matchScore) >= 80
                        ? "Strong Match"
                        : Number(jobAnalysisResult.data.matchScore) >= 60
                          ? "Moderate Match"
                          : "Needs Improvement"}
                    </span>
                  </div>
                </div>


                <div className="job-match-detail-grid">
                  <div className="job-match-detail-card matching-card">
                    <div className="job-match-card-heading">
                      <span className="job-match-card-icon">✓</span>
                      <h4>Matching Skills</h4>
                    </div>

                    {(jobAnalysisResult.data.matchingSkills || []).length > 0 ? (
                      <div className="job-match-tags">
                        {jobAnalysisResult.data.matchingSkills.map((item, i) => (
                          <span className="job-match-tag" key={i}>
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="job-match-empty">No matching skills identified.</p>
                    )}
                  </div>

                  <div className="job-match-detail-card missing-card">
                    <div className="job-match-card-heading">
                      <span className="job-match-card-icon">!</span>
                      <h4>Missing Skills</h4>
                    </div>

                    {(jobAnalysisResult.data.missingSkills || []).length > 0 ? (
                      <div className="job-match-tags">
                        {jobAnalysisResult.data.missingSkills.map((item, i) => (
                          <span className="job-match-tag" key={i}>
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="job-match-empty">No missing skills identified.</p>
                    )}
                  </div>

                  <div className="job-match-detail-card suggestions-card">
                    <div className="job-match-card-heading">
                      <span className="job-match-card-icon">✦</span>
                      <h4>Suggestions</h4>
                    </div>

                    {(jobAnalysisResult.data.suggestions || []).length > 0 ? (
                      <ul className="job-match-suggestions">
                        {jobAnalysisResult.data.suggestions.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="job-match-empty">No suggestions available.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}


        <button
          className="primary-action modal-run"
          onClick={onRun}
          disabled={loading || !value.trim()}
        >
          {loading
            ? "Analyzing…"
            : mode === "jd"
              ? "Analyze Job Description"
              : "Analyze Match"}
          <span className="ai-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

function paginateResume(r, compact = false) { const limit = compact ? 900 : 960, pages = []; let page = {}, used = 84; const push = () => { if (Object.keys(page).length) pages.push(page); page = {}; used = 84 }; const h = t => Math.max(1, Math.ceil(String(t || '').length / (compact ? 125 : 118)) * 14), add = (k, v, height) => { if (!v?.length) return; if (used + 31 + height > limit && Object.keys(page).length) push(); page[k] = v; used += 31 + height }; if (r.summary) add('summary', r.summary, h(r.summary)); const flow = (k, arr) => { arr?.forEach(e => { const base = 38 + h(e.role || e.name || ''); let cur = { ...e, bullets: [] }; e.bullets?.forEach(b => { const bh = h(b) + 4; if (used + 31 + base + cur.bullets.reduce((s, x) => s + h(x) + 4, 0) + bh > limit && cur.bullets.length) { page[k] = [...(page[k] || []), cur]; push(); cur = { ...e, bullets: [] } } cur.bullets.push(b) }); page[k] = [...(page[k] || []), cur]; used += base + cur.bullets.reduce((s, x) => s + h(x) + 4, 0) + 8; if (used > limit) push() }) }; flow('experience', r.experience); flow('projects', r.projects); add('skills', r.skills, h(r.skills.join(' · '))); add('education', r.education, r.education.reduce((s, e) => s + 52 + h(e.detail), 0)); add('achievements', r.achievements, r.achievements.reduce((s, x) => s + h(x) + 4, 0)); add('certifications', r.certifications, r.certifications.reduce((s, x) => s + h(x) + 4, 0)); add('customSections', r.customSections, r.customSections.reduce((s, x) => s + 35 + x.items.reduce((a, y) => a + h(y) + 4, 0), 0)); if (Object.keys(page).length) pages.push(page); return pages.length ? pages : [{}] }
function compactText(t = '') { const x = t.replace(/\b(successfully|various|multiple|really|very|responsible for|focused on)\b/gi, '').replace(/\s{2,}/g, ' ').trim().replace(/\.$/, ''); return x ? `${x}.` : '' } function improveBullet(t = '') { const c = compactText(t); return c && !/\b(built|improved|led|designed|developed|created|optimized|shipped|reduced|increased)\b/i.test(c) ? `Built and ${c.charAt(0).toLowerCase()}${c.slice(1)}` : c } function improveSummary(t = '') { return compactText(t).replace(/strong foundation in/gi, 'expertise in') }

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');
*{box-sizing:border-box}.resumind-builder{height:100vh;overflow:hidden;color:#e2e8f0;font-family:'DM Sans',system-ui,sans-serif;background:radial-gradient(circle at 15% 0%,rgba(99,102,241,.13),transparent 30%),#070914}.builder-topbar{height:68px;border-bottom:1px solid rgba(148,163,184,.13);display:flex;align-items:center;justify-content:space-between;padding:0 22px;background:rgba(7,9,20,.92);backdrop-filter:blur(18px)}.top-left,.top-actions{display:flex;align-items:center;gap:10px}.icon-button,.toolbar-button,.ghost-action{border:1px solid rgba(148,163,184,.15);background:rgba(15,23,42,.72);color:#cbd5e1;border-radius:10px;height:38px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.2s;cursor:pointer;text-decoration:none}.icon-button{width:38px;padding:0}.icon-button:hover,.toolbar-button:hover,.ghost-action:hover{border-color:rgba(129,140,248,.5);color:#fff;transform:translateY(-1px)}.brand-lockup{font:800 20px Manrope,sans-serif;letter-spacing:-.04em}.brand-lockup b{color:#818cf8}.brand-lockup em{font:800 8px DM Sans,sans-serif;font-style:normal;letter-spacing:.18em;color:#64748b;margin-left:9px}.save-state{font-size:11px;color:#64748b}.save-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#34d399;margin-right:7px;box-shadow:0 0 10px rgba(52,211,153,.7)}.primary-action{border:0;background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;border-radius:10px;height:38px;padding:0 14px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:700;font-size:12px;box-shadow:0 10px 30px rgba(79,70,229,.24);transition:.2s;cursor:pointer}.primary-action:hover:not(:disabled){transform:translateY(-1px)}.primary-action:disabled{opacity:.5;cursor:not-allowed}.template-pill{font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#a5b4fc;border:1px solid rgba(129,140,248,.2);background:rgba(99,102,241,.08);padding:7px 9px;border-radius:999px}.builder-shell{display:grid;grid-template-columns:minmax(390px,460px) minmax(0,1fr);height:calc(100vh - 68px);min-height:0;overflow:hidden}.editor-panel{min-height:0;border-right:1px solid rgba(148,163,184,.13);padding:22px 18px 30px;overflow-y:auto;background:linear-gradient(180deg,rgba(15,23,42,.54),rgba(7,9,20,.22));scrollbar-gutter:stable}.panel-heading{display:flex;align-items:flex-start;justify-content:space-between}.eyebrow{text-transform:uppercase;letter-spacing:.13em;font-size:9px;color:#64748b;font-weight:800;margin:0 0 5px}.panel-heading h1{font:800 22px/1.1 Manrope,sans-serif;letter-spacing:-.04em;margin:0}.completion{font-size:11px;color:#a5b4fc;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);padding:6px 8px;border-radius:8px}.completion-track{height:3px;background:#111827;border-radius:999px;margin:15px 0}.completion-track span{display:block;width:92%;height:100%;background:linear-gradient(90deg,#6366f1,#a78bfa);border-radius:999px}.section-list{display:grid;gap:5px}.section-wrap{border:1px solid transparent;border-radius:12px;overflow:hidden}.section-wrap.is-open{border-color:rgba(129,140,248,.18);background:rgba(15,23,42,.34)}.section-trigger{width:100%;border:0;background:transparent;color:#cbd5e1;display:flex;align-items:center;gap:11px;padding:12px 11px;font-weight:600;font-size:12px;text-align:left;cursor:pointer}.section-trigger:hover{background:rgba(99,102,241,.07);color:white}.section-icon{height:29px;width:29px;border-radius:8px;display:grid;place-items:center;background:#111827;color:#818cf8;border:1px solid rgba(148,163,184,.1)}.section-chevron{margin-left:auto;transition:.2s}.is-open .section-chevron{transform:rotate(180deg);color:#818cf8}.inline-editor{padding:2px 11px 13px 51px;animation:open .18s ease-out}@keyframes open{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}.form-stack{display:grid;gap:10px}.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.field{display:grid;gap:5px}.field span,.field-label-row label{font-size:10px;font-weight:700;color:#64748b}.field input,.form-stack textarea,.list-edit input,.custom-section-row input{width:100%;border:1px solid rgba(148,163,184,.13);background:#0b1020;color:#e2e8f0;border-radius:8px;padding:9px 10px;font:500 11px/1.4 'DM Sans',sans-serif;outline:none}.field input:focus,.form-stack textarea:focus,.list-edit input:focus,.custom-section-row input:focus{border-color:rgba(129,140,248,.65);box-shadow:0 0 0 3px rgba(99,102,241,.09)}textarea{resize:vertical}.field-label-row{display:flex;justify-content:space-between;align-items:center;gap:8px}.mini-ai{border:1px solid rgba(129,140,248,.2);background:rgba(99,102,241,.08);color:#a5b4fc;border-radius:7px;padding:5px 8px;font-size:9px;font-weight:800;display:inline-flex;align-items:center;gap:5px;cursor:pointer;white-space:nowrap}.entry-card{border:1px solid rgba(148,163,184,.1);background:rgba(2,6,23,.28);border-radius:10px;padding:10px;display:grid;gap:9px}.entry-title{display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#cbd5e1}.entry-title button,.list-edit button{border:0;background:transparent;color:#64748b;cursor:pointer}.entry-title button:hover,.list-edit button:hover{color:#fb7185}.bullet-edit{position:relative}.bullet-edit textarea{padding-right:78px}.bullet-edit .mini-ai{position:absolute;right:6px;bottom:6px}.add-line,.add-entry,.add-section-main{border:1px dashed rgba(129,140,248,.25);background:transparent;color:#818cf8;border-radius:8px;padding:9px;font-size:10px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px}.add-entry{width:100%}.add-section-main{width:100%;margin-top:10px;border-style:solid;background:rgba(99,102,241,.07)}.skill-chips{display:flex;flex-wrap:wrap;gap:5px}.skill-chips span{font-size:9px;color:#cbd5e1;background:#111827;border:1px solid rgba(148,163,184,.12);padding:5px 7px;border-radius:6px;display:flex;gap:5px;align-items:center}.skill-chips button{border:0;background:none;color:#64748b;padding:0;cursor:pointer}.list-edit{display:flex;gap:6px}.list-edit input{flex:1}.ai-zone{margin-top:19px;border-top:1px solid rgba(148,163,184,.1);padding-top:17px}.ai-zone-head{display:flex;gap:10px;align-items:center}.ai-zone-head strong{font-size:12px}.ai-zone-head small{display:block;font-size:9px;color:#64748b;margin-top:2px}.ai-orb{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;color:#c4b5fd;background:linear-gradient(135deg,rgba(99,102,241,.2),rgba(168,85,247,.12));border:1px solid rgba(129,140,248,.22)}.ai-grid{display:grid;gap:6px;margin-top:10px}.ai-tool{width:100%;border:1px solid rgba(148,163,184,.1);background:rgba(15,23,42,.45);color:#e2e8f0;border-radius:10px;padding:9px;display:flex;align-items:center;text-align:left;gap:9px;cursor:pointer}.ai-tool:hover:not(:disabled){border-color:rgba(129,140,248,.38);background:rgba(30,41,59,.6);transform:translateX(2px)}.ai-tool:disabled{opacity:.62;cursor:wait}.ai-tool-icon{width:27px;height:27px;display:grid;place-items:center;border-radius:7px;background:rgba(99,102,241,.1);color:#a5b4fc;flex:0 0 27px}.ai-tool strong{display:block;font-size:10px}.ai-tool small{display:block;color:#64748b;font-size:8px;margin-top:2px}.ai-arrow{margin-left:auto;color:#818cf8;font-size:15px}.preview-panel{min-width:0;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:#0a0d17}.preview-toolbar{height:62px;border-bottom:1px solid rgba(148,163,184,.1);display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex:0 0 62px}.preview-toolbar strong{font:700 12px Manrope,sans-serif;color:#cbd5e1}.preview-actions{display:flex;gap:10px;align-items:center}.toolbar-button{height:32px;font-size:10px}.page-fit{font-size:9px;color:#64748b;border:1px solid rgba(148,163,184,.1);padding:8px 9px;border-radius:8px}.resume-stage{flex:1;min-height:0;padding:34px 26px 70px;display:flex;flex-direction:column;align-items:center;gap:30px;overflow-y:auto;background:radial-gradient(circle at 50% 0%,rgba(99,102,241,.07),transparent 35%);scrollbar-gutter:stable}.a4-page{position:relative;flex:0 0 1123px;width:min(794px,100%);height:1123px;background:#fff;color:#1e293b;box-shadow:0 25px 70px rgba(0,0,0,.42);padding:55px 62px 58px;overflow:hidden;font-family:Arial,Helvetica,sans-serif}.resume-header{display:flex;justify-content:space-between;gap:25px;padding-bottom:18px;border-bottom:2px solid #1e293b}.resume-header h2{font-size:29px;line-height:1;margin:0 0 7px;font-weight:800;letter-spacing:-.03em}.resume-header p{font-size:12px;color:#475569;margin:0}.contact-grid{display:grid;grid-template-columns:1fr 1fr;align-content:start;gap:5px 15px;font-size:8.5px;color:#475569;max-width:270px}.contact-grid span{display:flex;align-items:center;gap:4px;min-width:0}.resume-section{margin-top:17px}.resume-section h3{font-size:9px;letter-spacing:.17em;margin:0 0 8px;color:#334155;border-bottom:1px solid #cbd5e1;padding-bottom:4px}.resume-body,.skills-line,.muted{font-size:9.2px;line-height:1.55;color:#475569;margin:0}.resume-entry{margin:0 0 12px}.resume-row{display:flex;justify-content:space-between;gap:15px;font-size:9.5px;line-height:1.4}.resume-row strong{font-size:10px}.resume-row span{white-space:nowrap}.resume-entry ul,.resume-section>ul{margin:5px 0 0;padding-left:15px}.resume-entry li,.resume-section>ul li{font-size:9px;line-height:1.55;margin-bottom:3px;color:#334155}.page-footer{position:absolute;bottom:25px;left:62px;right:62px;text-align:center;color:#94a3b8;font-size:7px;border-top:1px solid #e2e8f0;padding-top:7px}.center-header{display:block;text-align:center}.center-header .contact-grid{margin:9px auto 0;display:flex;justify-content:center;gap:10px;max-width:none}.executive-head{text-align:center;border-bottom:1px solid #cbd5e1;padding-bottom:18px}.executive-head h2{font:700 31px Georgia,serif;margin:0;color:#17201d}.executive-head p{margin:7px 0 0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#64748b}.executive-contact{margin-top:9px;font-size:8px;color:#64748b}.executive-body{padding:0 8px}.split-layout{display:grid;grid-template-columns:185px 1fr;height:100%;margin:-55px -62px -58px}.side-modern{background:#172554;color:#fff;padding:52px 20px}.avatar,.creative-avatar{width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.16);display:grid;place-items:center;font-weight:800;font-size:17px;margin:0 auto 22px}.side-modern h4,.side-creative h4{font-size:8px;letter-spacing:.16em;margin:18px 0 8px;color:rgba(255,255,255,.75)}.contact-text{display:grid;gap:7px;font-size:7.5px;line-height:1.35;word-break:break-word}.side-skills{display:flex;flex-wrap:wrap;gap:5px}.side-skills span{font-size:7px;border:1px solid rgba(255,255,255,.2);padding:4px 5px;border-radius:4px}.side-edu{display:grid;gap:3px;font-size:7px;margin-bottom:9px}.side-edu span{color:rgba(255,255,255,.65)}.main-modern{padding:58px 52px;background:#fff}.modern-head{border-bottom:3px solid #4f46e5;padding-bottom:18px;margin-bottom:4px}.modern-head h2,.creative-head h2{font-size:29px;margin:0;font-weight:800}.modern-head p,.creative-head p{font-size:11px;color:#64748b;margin:7px 0 0}.template-modern .resume-section h3{color:#4f46e5;border-bottom-color:#c7d2fe}.creative-layout .side-creative{background:linear-gradient(180deg,#a21caf,#4c1d95);color:#fff;padding:52px 20px}.creative-avatar{border-radius:14px;border:2px solid rgba(255,255,255,.3)}.main-creative{padding:58px 52px}.creative-head{border-bottom:3px solid #c026d3;padding-bottom:18px}.template-creative .resume-section h3{color:#a21caf;border-bottom:0}.template-executive .resume-section h3{font-family:Georgia,serif;letter-spacing:.08em;color:#0f766e}.template-classic .resume-header{padding-bottom:14px;border-bottom:2px solid #111827}.template-classic .resume-header h2{font-size:27px;font-weight:700;letter-spacing:0}.template-classic .resume-section{margin-top:14px}.template-classic .resume-section h3{font-size:9px;font-weight:800;letter-spacing:.08em;color:#111827;border-bottom:1px solid #111827;padding-bottom:3px;margin-bottom:7px}.template-classic .resume-body,.template-classic .skills-line,.template-classic .muted{font-size:8.8px;line-height:1.45;color:#1f2937}.template-classic .resume-entry{margin-bottom:9px}.template-classic .resume-entry li,.template-classic .resume-section>ul li{font-size:8.7px;line-height:1.45;margin-bottom:2px}.custom-item{margin-bottom:5px}.toast{position:fixed;right:24px;bottom:24px;z-index:60;display:flex;align-items:center;gap:9px;padding:11px 14px;background:#111827;border:1px solid rgba(129,140,248,.3);border-radius:11px;box-shadow:0 15px 40px rgba(0,0,0,.35);font-size:11px}.toast span{width:23px;height:23px;border-radius:7px;background:#064e3b;color:#6ee7b7;display:grid;place-items:center}.modal-backdrop{position:fixed;inset:0;z-index:50;background:rgba(2,6,23,.72);backdrop-filter:blur(10px);display:grid;place-items:center;padding:20px}.add-modal,.job-modal{width:min(600px,100%);background:#0d1323;border:1px solid rgba(129,140,248,.22);border-radius:18px;padding:20px;box-shadow:0 30px 100px rgba(0,0,0,.55)}.modal-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:15px}.modal-head>div{display:flex;gap:10px}.modal-head>button{border:0;background:none;color:#64748b;cursor:pointer}.modal-head strong{font-size:12px}.modal-head small{display:block;font-size:9px;color:#64748b;margin-top:2px}.add-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.add-choice-grid button{border:1px solid rgba(148,163,184,.12);background:#0a1020;color:#cbd5e1;border-radius:10px;padding:12px;display:flex;align-items:center;gap:9px;text-align:left;font-size:11px;font-weight:700;cursor:pointer}.add-choice-grid button:hover{border-color:rgba(129,140,248,.5);background:#111a31}.add-choice-grid button span{width:29px;height:29px;border-radius:8px;background:rgba(99,102,241,.1);color:#a5b4fc;display:grid;place-items:center}.add-choice-grid button b{margin-left:auto;color:#818cf8}.custom-section-row{display:flex;gap:8px;margin-top:10px}.custom-section-row input{flex:1}.job-modal textarea{width:100%;border:1px solid rgba(148,163,184,.15);background:#080c18;color:#e2e8f0;border-radius:11px;padding:12px;font:500 12px/1.5 'DM Sans',sans-serif;outline:none}.modal-run{width:100%;margin-top:10px}
.ai-analysis-modal {
  width: min(720px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  background: #0d1323;
  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.6);
  scrollbar-width: thin;
}

.ai-analysis-modal::-webkit-scrollbar {
  width: 6px;
}

.ai-analysis-modal::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}

.ats-score-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  margin-bottom: 18px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.14),
    rgba(168, 85, 247, 0.08)
  );
  border-radius: 14px;
}

.ats-score {
  --score: 0%;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex: 0 0 88px;

  background:
    radial-gradient(
      circle at center,
      #0b1020 58%,
      transparent 59%
    ),
    conic-gradient(
      #6366f1 var(--score),
      #1e293b var(--score)
    );

  box-shadow:
    0 0 30px rgba(99, 102, 241, 0.18);
}

.ats-score-inner {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1px;
}

.ats-score-inner strong {
  color: #f8fafc;
  font: 800 23px Manrope, sans-serif;
}

.ats-score-inner span {
  color: #64748b;
  font-size: 9px;
  font-weight: 700;
}

.ats-score-card strong {
  display: block;
  color: #f8fafc;
  font-size: 14px;
}

.ats-score-card small {
  display: block;
  color: #64748b;
  font-size: 10px;
  margin-top: 4px;
}

.analysis-section {
  margin-top: 18px;
}

.analysis-section h4 {
  margin: 0 0 8px;
  color: #cbd5e1;
  font: 700 11px Manrope, sans-serif;
  letter-spacing: 0.04em;
}

.analysis-section p {
  margin: 0;
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.6;
}

.analysis-section ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 7px;
}

.analysis-section li {
  color: #94a3b8;
  font-size: 10.5px;
  line-height: 1.5;
  padding: 8px 10px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: 8px;
}

.analysis-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.analysis-tags span {
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 999px;
  padding: 6px 9px;
  font-size: 9px;
  font-weight: 700;
}

.keyword-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px 6px 5px 9px;
  border-radius: 999px;
  color: #a5b4fc;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
}

.keyword-chip span {
  font-size: 9px;
  font-weight: 700;
}

.keyword-chip button {
  border: 0;
  border-radius: 999px;
  padding: 3px 7px;
  background: rgba(99, 102, 241, 0.18);
  color: #c4b5fd;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.keyword-chip button:hover {
  background: rgba(99, 102, 241, 0.3);
}

.keyword-chip button:disabled {
  cursor: default;
  opacity: 0.65;
}

@media (max-width: 600px) {
  .ai-analysis-modal {
    padding: 16px;
    max-height: 90vh;
  }

  .ats-score {
    width: 64px;
    height: 64px;
    font-size: 20px;
  }

  .ats-status {
  display: inline-block;
  margin-top: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 800;
}

.ats-status.poor {
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.ats-status.needs-work {
  color: #fb923c;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
}

.ats-status.good {
  color: #facc15;
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.2);
}

.add-all-keywords {
  margin-bottom: 10px;
  padding: 7px 11px;
  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
}

.add-all-keywords:hover {
  background: rgba(99, 102, 241, 0.22);
  border-color: rgba(129, 140, 248, 0.4);
}

.ats-status.excellent {
  color: #4ade80;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
} 
}

@media print{.resumind-builder{background:white!important;height:auto!important;overflow:visible!important}.builder-topbar,.editor-panel,.preview-toolbar,.toast{display:none!important}.builder-shell{display:block!important;height:auto!important}.preview-panel{display:block!important;overflow:visible!important}.resume-stage{display:block!important;padding:0!important;overflow:visible!important}.a4-page{box-shadow:none!important;margin:0!important;break-after:page!important;page-break-after:always!important}.a4-page:last-child{break-after:auto!important;page-break-after:auto!important}}@media(max-width:1050px){.builder-shell{grid-template-columns:360px minmax(0,1fr)}.a4-page{padding-left:42px;padding-right:42px}.split-layout{margin:-55px -42px -58px}.page-footer{left:42px;right:42px}}@media(max-width:820px){.resumind-builder{height:auto;min-height:100vh;overflow:visible}.builder-shell{display:flex;flex-direction:column;height:auto}.editor-panel{max-height:72vh;border-right:0;border-bottom:1px solid rgba(148,163,184,.13)}.preview-panel{height:calc(100vh - 68px);min-height:700px}.top-actions .save-state,.top-actions .ghost-action{display:none}.a4-page{transform:scale(.78);transform-origin:top center;margin-bottom:-220px}.resume-stage{padding:24px 10px 50px}}

button.add-all-keywords {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0 12px;
  padding: 9px 16px;
  border: 1px solid rgba(139, 92, 246, 0.5);
  border-radius: 10px;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

button.add-all-keywords:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
  filter: brightness(1.1);
}

button.add-all-keywords:active {
  transform: translateY(0);
}


.job-analysis-results {
  margin-top: 18px;
  padding: 18px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.55);
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.job-analysis-results h3 {
  margin: 0 0 16px;
  font-size: 18px;
  color: #a5b4fc;
}

.job-analysis-results h4 {
  margin: 16px 0 8px;
  font-size: 14px;
  color: #cbd5e1;
}

.job-analysis-results ul {
  margin: 0;
  padding-left: 20px;
}

.job-analysis-results li {
  margin: 6px 0;
  color: #e2e8f0;
  line-height: 1.5;
}

.match-score-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  margin: 14px 0 20px;
  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.14),
    rgba(168, 85, 247, 0.06)
  );
}

.match-score-circle {
  --match-score: 0%;
  width: 86px;
  height: 86px;
  flex: 0 0 86px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(
    #818cf8 var(--match-score),
    #1e293b var(--match-score)
  );
}

.match-score-inner {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 50%;
  background: #0d1323;
}

.match-score-inner strong {
  color: #f8fafc;
  font-size: 22px;
  font-weight: 800;
}

.match-score-inner span {
  color: #a5b4fc;
  font-size: 10px;
}

.match-score-info h3 {
  margin: 0 0 6px;
  color: #e2e8f0;
  font-size: 15px;
}

.match-score-info p {
  margin: 0 0 10px;
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.5;
}

.match-score-badge {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.14);
  border: 1px solid rgba(129, 140, 248, 0.25);
  color: #c4b5fd;
  font-size: 10px;
  font-weight: 700;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .match-score-card {
    gap: 12px;
    padding: 12px;
  }

.match-score-circle {
    width: 70px;
    height: 70px;
    flex-basis: 70px;
  }

.match-score-inner {
    width: 58px;
    height: 58px;
  }

.match-score-inner strong {
    font-size: 18px;
  }

.match-score-info h3 {
    font-size: 13px;
  }
}
</CodeBlock>

.job-match-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.job-match-detail-card {
  min-width: 0;
  padding: 15px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.65);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.job-match-detail-card:hover {
  transform: translateY(-2px);
  border-color: rgba(129, 140, 248, 0.45);
}

.job-match-card-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 13px;
}

.job-match-card-heading h4 {
  margin: 0;
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 700;
}

.job-match-card-icon {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(129, 140, 248, 0.13);
  color: #a5b4fc;
  font-size: 14px;
  font-weight: 800;
}

.matching-card .job-match-card-icon {
  color: #6ee7b7;
  background: rgba(16, 185, 129, 0.12);
}

.missing-card .job-match-card-icon {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.12);
}

.job-match-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.job-match-tag {
  display: inline-flex;
  max-width: 100%;
  padding: 6px 9px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.09);
  color: #cbd5e1;
  font-size: 11px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.matching-card .job-match-tag {
  border-color: rgba(16, 185, 129, 0.2);
  background: rgba(16, 185, 129, 0.08);
  color: #a7f3d0;
}

.missing-card .job-match-tag {
  border-color: rgba(248, 113, 113, 0.2);
  background: rgba(239, 68, 68, 0.07);
  color: #fecaca;
}

.suggestions-card {
  grid-column: 1 / -1;
}

.job-match-suggestions {
  margin: 0;
  padding-left: 19px;
}

.job-match-suggestions li {
  padding-left: 3px;
  margin: 8px 0;
  color: #cbd5e1;
  font-size: 12px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.job-match-empty {
  margin: 0;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.5;
}

/* JD Analyzer Premium UI */
.jd-analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.jd-analysis-card {
  background: linear-gradient(145deg, #111a2d, #0d1424);
  border: 1px solid #26334b;
  border-radius: 18px;
  padding: 20px;
  transition: all 0.25s ease;
}

.jd-analysis-card:hover {
  border-color: #655cf5;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99, 91, 245, 0.10);
}

.jd-card-heading {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 18px;
}

.jd-card-heading h4 {
  color: #e2e8f5;
  font-size: 15px;
  font-weight: 650;
  margin: 0;
}

.jd-card-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: rgba(109, 99, 255, 0.15);
  color: #a69cff;
  font-size: 18px;
}

.jd-required .jd-card-icon {
  color: #54d6b0;
  background: rgba(49, 211, 160, 0.12);
}

.jd-preferred .jd-card-icon {
  color: #b5a4ff;
  background: rgba(139, 112, 255, 0.15);
}

.jd-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.jd-tag {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 9px;
  background: rgba(76, 201, 165, 0.10);
  border: 1px solid rgba(76, 201, 165, 0.24);
  color: #8ce4c8;
  font-size: 12px;
  font-weight: 550;
  transition: all 0.2s ease;
}

.jd-tag:hover {
  background: rgba(76, 201, 165, 0.18);
  border-color: #4cc9a5;
}

.jd-preferred .jd-tag {
  background: rgba(139, 112, 255, 0.10);
  border-color: rgba(139, 112, 255, 0.25);
  color: #c0b4ff;
}

.jd-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.jd-list li {
  position: relative;
  padding: 11px 12px 11px 30px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  color: #c5cede;
  font-size: 13px;
  line-height: 1.6;
}

.jd-list li::before {
  content: "✦";
  position: absolute;
  left: 12px;
  top: 11px;
  color: #9588ff;
}

.jd-empty {
  color: #77849b;
  font-size: 13px;
  margin: 0;
  padding: 10px 0;
}

@media (max-width: 650px) {
  .jd-analysis-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .job-match-detail-grid {
    grid-template-columns: 1fr;
  }

.suggestions-card {
    grid-column: auto;
  }
}

`;

export default Builder;
