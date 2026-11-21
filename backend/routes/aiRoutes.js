const express = require("express");
const {
  analyzeResume,
  analyzeATSResume,
  runAITool
} = require("../ai/resumeAnalyzer");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const extractResumeText = require("../ai/documentParser");


const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const analysis = await analyzeResume(resumeText);

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
    });
  }
});


router.post("/tool", async (req, res) => {
  try {
    const { tool, resumeText, jobDescription = "", text = "" } = req.body;

    const allowedTools = [
      "copilot",
      "bullet",
      "optimize",
      "skills",
      "jd",
      "match",
      "copilotText",
      "onepage",
    ];

    if (!allowedTools.includes(tool)) {
      return res.status(400).json({
        message: "Invalid AI tool",
      });
    }

    if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({
        message: "Resume data is required",
      });
    }

    if (["jd", "match"].includes(tool) && !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const result = await runAITool(
      tool,
      resumeText,
      jobDescription,
      text
    );

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI Tool Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "AI tool failed. Please try again.",
    });
  }
});


router.post(
  "/ats-upload",
  authMiddleware,
  (req, res, next) => {
    upload.single("resume")(req, res, (error) => {
      if (error) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "File size must not exceed 5 MB",
          });
        }

        return res.status(400).json({
          success: false,
          message: error.message || "Invalid file upload",
        });
      }

      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a resume file",
        });
      }

      const resumeText = await extractResumeText(req.file);

      if (!resumeText || !resumeText.trim()) {
        return res.status(400).json({
          success: false,
          message: "Could not extract text from this document",
        });
      }

      const { jobDescription = "" } = req.body;

      const analysis = await analyzeATSResume(
        resumeText,
        jobDescription
      );

      return res.status(200).json({
        success: true,
        message: "Gemini ATS analysis completed",
        resumeText,
        analysis,
      });
    } catch (error) {
      console.error("ATS Upload Error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to process resume document",
      });
    }
  }
);


module.exports = router;