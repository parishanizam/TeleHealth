const path = require('path');
const { exec } = require('child_process');

describe('Media Processing Scripts', () => {
  test('Runs testAudioProcessing.js without errors', (done) => {
    const scriptPath = path.join(
      __dirname,
      '../services/media-processing-service/helpers/testAudioProcessing.js'
    );
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      // Optionally, check stdout/stderr here
      done();
    });
  });

  test('Runs testVideoProcessing.js without errors', (done) => {
    const scriptPath = path.join(
      __dirname,
      '../services/media-processing-service/helpers/testVideoProcessing.js'
    );
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      // Optionally, check stdout/stderr here
      done();
    });
  });

  // New test for testBiasDetection.js
  test('Runs testBiasDetection.js without errors', (done) => {
    const scriptPath = path.join(
      __dirname,
      '../services/media-processing-service/helpers/testBiasDetection.js'
    );
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      // Optionally, check stdout/stderr here
      done();
    });
  });
});
