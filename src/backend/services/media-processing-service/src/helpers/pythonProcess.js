const { spawnSync } = require('child_process');
const path = require('path');


function runPythonScript(scriptName, videoPath) {
  // Build absolute path to the script
  const scriptPath = path.join(__dirname, '../../python-scripts', scriptName);

  // We might get our Python interpreter from an env variable
  const pythonCmd = process.env.PYTHON_PATH || 'python';

  const result = spawnSync(pythonCmd, [scriptPath, videoPath], {
    encoding: 'utf-8'
  });

  if (result.error) {
    // This usually means the python command failed to spawn
    throw new Error(`Failed to spawn script: ${result.error.message}`);
  }
  if (result.status !== 0) {
    // Non-zero exit code => Python script likely had an error
    const stderr = result.stderr || '';
    // Or parse the stdout if there's a JSON with an "error" key
    const stdout = result.stdout || '';
    throw new Error(`Script exit code ${result.status} - ${stderr} - ${stdout}`);
  }

  // Attempt to parse JSON from stdout
  try {
    return JSON.parse(result.stdout);
  } catch (err) {
    throw new Error(`Failed to parse JSON from Python: ${result.stdout}`);
  }
}

module.exports = {
  runPythonScript,
};
