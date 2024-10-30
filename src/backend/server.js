// src/backend/server.js
const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Simple test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/detect", (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  const pythonScriptPath = path.join(__dirname, "model.py");
  const pythonProcess = spawn("python", [pythonScriptPath]);

  // Send image data to Python process via stdin
  pythonProcess.stdin.write(JSON.stringify({ image }));
  pythonProcess.stdin.end();

  let stdoutData = "";  // Buffer for accumulating data from stdout
  let stderrData = "";  // Buffer for accumulating data from stderr (warnings)

  // Collect data from Python's stdout
  pythonProcess.stdout.on("data", (data) => {
    stdoutData += data.toString();
  });

  // Collect data from Python's stderr without responding based on stderr output
  pythonProcess.stderr.on("data", (data) => {
    stderrData += data.toString();
    console.error(`Python warning/error: ${data.toString()}`);
  });

  // Handle when stdout finishes (Python process ends successfully)
  pythonProcess.stdout.on("end", () => {
    try {
      const result = JSON.parse(stdoutData);  // Attempt to parse JSON from Python stdout
      if (!res.headersSent) res.json(result);  // Send JSON response to client
    } catch (err) {
      console.error("Failed to parse Python output:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to parse Python output" });
      }
    }
  });

  // Ensure that if Python exits with an error, a response is sent only once
  pythonProcess.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Python process exited with code ${code}`);
      if (!res.headersSent) {
        res.status(500).json({ error: "Python process exited with an error" });
      }
    }
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
