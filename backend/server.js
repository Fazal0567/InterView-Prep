require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

const app = express();

// 🔐 DB Connection
connectDB();

// 🔧 Middleware
app.use(express.json());
app.use(cors({
  origin: "https://interview-prep-dxrh.onrender.com", // Replace with your actual frontend domain
  credentials: true
}));

// 📁 Static Uploads (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔗 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// 📦 Serve React Vite Frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// 🧭 Catch-all to support client-side routing (like /dashboard, /profile)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
