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

// ✅ Allow only deployed frontend domain
const allowedOrigins = ["https://interview-prep-dxrh.onrender.com"];

app.use(
  cors({
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
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

connectDB(); // ✅ Connect to MongoDB
app.use(express.json()); // ✅ Parse JSON request bodies

// ✅ Public API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// ✅ AI Routes with auth protection
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
