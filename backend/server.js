require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

const app = express();

// ✅ CORS Config
const corsOptions = {
  origin: process.env.FRONTEND_URL, // From .env
  credentials: true,
};

// ✅ Handle CORS & Preflight Globally (IMPORTANT!)
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ⬅️ Preflight support

console.log("🛡️ CORS allowed origin:", process.env.FRONTEND_URL);

// ✅ Middleware
connectDB(); // MongoDB connection
app.use(express.json()); // Parse JSON body

// ✅ Logging origin (debugging)
app.use((req, res, next) => {
  console.log(`🔍 Origin: ${req.headers.origin} | Method: ${req.method}`);
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// ✅ AI Protected Routes
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// ✅ Static File Serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Basic Health Check (Ping)
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is live!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
