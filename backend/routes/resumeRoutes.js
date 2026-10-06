const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, template } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Resume title is required",
      });
    }

    const resume = await Resume.create({
      userId: req.userId,
      title,
      content: content || {},
      template: template || "classic",
    });

    res.status(201).json({
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    console.error("Save Resume Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.userId,
    }).sort({ updatedAt: -1 });

    console.log("Logged-in User ID:", req.userId);
    console.log("Found Resumes:", resumes.length);

    const allResumes = await Resume.find();

    console.log("Total Resumes In DB:", allResumes.length);
    console.log(
      "Resume User IDs:",
      allResumes.map((resume) => resume.userId.toString())
    );

    res.status(200).json({
      resumes,
    });
  } catch (error) {
    console.error("Get Resumes Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Get Single Resume
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error("Get Resume Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});



// Update Resume
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, template } = req.body;

    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        title,
        content,
        template,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update Resume Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// Delete Resume
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete Resume Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});



router.get("/test", (req, res) => {
  res.json({
    message: "Resume route is working 🚀",
  });
});

module.exports = router;