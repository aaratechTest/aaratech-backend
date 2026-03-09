const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes");
const adminMgmtRoutes = require("./routes/adminRoutes");
const pageRoutes = require("./routes/pageRoutes");
const menuRoutes = require("./routes/menuRoutes");
const contentRoutes = require("./routes/contentRoutes");
const blogRoutes = require("./routes/blogRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Aaratech Backend API is running" });
});

app.use("/api/health", healthRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminMgmtRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/settings", settingsRoutes);

// Only listen when running locally (not on Vercel)
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;
