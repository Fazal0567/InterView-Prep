const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
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

dotenv.config();
const app = express();

// Use this CORS config
const allowedOrigins = ["https://interview-prep-dxrh.onrender.com"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests globally
app.options("*", cors());

connectDB();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// AI routes
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
