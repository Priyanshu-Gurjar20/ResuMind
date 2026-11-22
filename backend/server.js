require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("ResuMind Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`ResuMind server running on port ${PORT}`);
});