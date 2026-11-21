const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(resumeText) {
  try {
    const prompt = `
You are an expert ATS resume analyzer.

Analyze the following resume and return ONLY valid JSON.

Resume:
${resumeText}

Return this exact JSON structure:

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "skillsAnalysis": {
    "technicalSkills": [],
    "softSkills": []
  },
  "suggestions": []
}

Rules:
- atsScore must be between 0 and 100.
- Give practical and specific suggestions.
- Do not invent information that is not present in the resume.
- Keep the response concise.
- Return ONLY JSON. No markdown and no explanation outside JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const text = response.text.trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Resume Analyzer Error:", error.message);
    throw new Error("Failed to analyze resume");
  }
}

async function analyzeATSResume(resumeText, jobDescription = "") {
  try {
    const prompt = `
You are an expert ATS resume evaluation system.

Analyze the resume carefully.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription || "Not provided"}

Return ONLY valid JSON in this exact structure:

{
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "skillsAnalysis": {
    "technicalSkills": [],
    "softSkills": []
  },
  "suggestions": []
}

RULES:
- Score must be between 0 and 100.
- Evaluate formatting, readability, sections, skills,
  experience, achievements and keyword relevance.
- If a job description is provided, evaluate actual
  skill and requirement alignment.
- Without a job description, evaluate general ATS compatibility.
- Never invent skills, achievements or experience.
- Give specific and actionable suggestions.
- Do not reward keywords that appear unnaturally.
- Return valid JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const result = response.text.trim()
      .replace(/^```json\s*|\s*```$/g, "");

    return JSON.parse(result);

  } catch (error) {
    console.error("ATS AI Analysis Error:", error.message);
    throw new Error("Failed to generate AI ATS analysis");
  }
}


async function runAITool(tool, resumeText, jobDescription = "", text = "") {
  const prompts = {
    copilot: `Improve the resume summary using only facts in this resume. Return only the improved summary.\nResume: ${resumeText}`,

    bullet: `Rewrite experience and project bullets to be concise and professional. Do not invent facts. Return JSON.\nResume: ${resumeText}`,

    optimize: `You are an expert ATS resume optimization specialist.

Analyze and optimize the resume provided below.

OBJECTIVES:
1. Improve the professional summary with strong, relevant language.
2. Rewrite experience bullets using action verbs and measurable impact where data already exists.
3. Improve project descriptions to highlight technical contributions.
4. Improve skills organization for ATS readability.
5. Correct grammar, clarity, and unnecessary repetition.
6. Use relevant industry keywords only when supported by the resume.
7. Maintain a professional, concise, recruiter-friendly writing style.

STRICT RULES:
- Never invent experience, achievements, metrics, certifications, or skills.
- Preserve all original factual information.
- Do not remove important resume sections.
- Preserve the exact existing JSON structure and field names.
- Keep the original contact details unchanged.
- Return the complete optimized resume as valid JSON.
- Return ONLY JSON. No markdown or explanations.

RESUME:
${resumeText}`,

    onepage: `Convert this resume into a professional one-page resume.

Rules:
- Preserve all important facts and achievements.
- Rewrite lengthy sentences into concise, impactful statements.
- Keep experience and project bullets limited to 2-3 per entry.
- Prioritize relevant technical skills and achievements.
- Remove repetitive or unnecessary wording.
- Do not invent skills, experience, metrics, or qualifications.
- Preserve the existing resume JSON structure and field names.
- Do not remove personal information or contact details.
- Return ONLY valid JSON containing the optimized resume fields.
- No markdown or explanation.

Resume:
${resumeText}`,

    skills: `Suggest relevant skills based on this resume. Return JSON with suggestedSkills and reasoning. Do not claim the person has skills without evidence.\nResume: ${resumeText}`,

    jd: `Analyze this job description. Return JSON with requiredSkills, preferredSkills, responsibilities, and qualifications.\nJob description: ${jobDescription}`,

    match: `Compare the resume and job description. Return JSON with matchScore (0-100), matchingSkills, missingSkills, and suggestions. Do not invent experience.\nResume: ${resumeText}\nJob description: ${jobDescription}`,

    copilotText: `Improve this resume content without changing its facts. Return only the improved content.\nResume: ${resumeText}\nContent: ${text}`,
  };

  if (!prompts[tool]) {
    throw new Error("Unsupported AI tool");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompts[tool],
  });

  return response.text.trim().replace(/^```json\s*|\s*```$/g, "");
}


module.exports = {
  analyzeResume,
  analyzeATSResume,
  runAITool,
};