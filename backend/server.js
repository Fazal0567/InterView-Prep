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

// ✅ Connect to MongoDB
connectDB();

// ✅ Express JSON Parser
app.use(express.json());

// ✅ CORS Configuration (Production Only)
const corsOptions = {
  origin: "https://interviewprep-alpha.vercel.app", // production frontend domain
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight across the board

// ✅ Debug Request Origins (Optional – remove if not needed)
app.use((req, res, next) => {
  console.log(`🔍 Origin: ${req.headers.origin} | Method: ${req.method}`);
  next();
});

// ✅ Public Static Files (e.g., uploaded assets)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// ✅ AI Routes (Protected)
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// ✅ Root Route (Health Check)
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is live!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
