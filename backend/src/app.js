const express = require("express");
const authRoutes = require("./routes/auth.routes");
const warrantyRoutes = require("./routes/warranty.routes");

const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.send("Phase 3 server alive");
});

app.use("/api/warranties", warrantyRoutes);

module.exports = app;   // 🔴 