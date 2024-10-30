// src/backend/server.js
const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const PORT = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Route to handle face and gesture detection
app.post("/api/detect", (req, res) => {
  const { image } = req.body;  // Base64 image string from the frontend

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  // Path to the Python model script
  const pythonScriptPath = path.join(__dirname, "model.py");

  // Spawn a new Python process
  const pythonProcess = spawn("python", [pythonScriptPath]);

  // Send image data to Python process via stdin
  pythonProcess.stdin.write(JSON.stringify({ image }));
  pythonProcess.stdin.end();

  // Capture output from Python script
  pythonProcess.stdout.on("data", (data) => {
    try {
      const result = JSON.parse(data.toString()); // Parse JSON output from Python
      res.json(result);  // Send result back to the frontend
    } catch (err) {
      console.error("Failed to parse Python output:", err);
      if (!res.headersSent) res.status(500).json({ error: "Failed to parse Python output" });
    }
  });

  // Handle Python stderr for any runtime errors in the Python script
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python error: ${data.toString()}`);
    if (!res.headersSent) res.status(500).json({ error: "An error occurred during detection" });
  });

  // Handle errors in starting the Python process
  pythonProcess.on("error", (error) => {
    console.error("Failed to start Python process:", error);
    if (!res.headersSent) res.status(500).json({ error: "Failed to start Python process" });
  });

  // Ensure that an error response is sent if Python exits unexpectedly
  pythonProcess.on("exit", (code) => {
    if (code !== 0 && !res.headersSent) {
      res.status(500).json({ error: "Python process exited with an error" });
    }
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
