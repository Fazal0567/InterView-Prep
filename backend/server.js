require("dotenv").config();
const express = require("express");
const cors = require("cors");
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

// ---------------- CORS Configuration ----------------
const allowedOrigins = ["https://interview-prep-dxrh.onrender.com"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Handle preflight (OPTIONS) requests
app.options("*", cors());
// -----------------------------------------------------

// Connect to MongoDB
connectDB();

// JSON parser
app.use(express.json());

// Public Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// Protected AI Routes
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
