const path = require('path');
const { exec } = require('child_process');

jest.setTimeout(30000); // Set timeout to 30 seconds for all tests in this file

describe('Media Processing Scripts', () => {
  test('Runs testAudioProcessing.js without errors', (done) => {
    const scriptPath = path.join(
      __dirname,
      '../services/media-processing-service/helpers/testAudioProcessing.js'
    );
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      expect(error).toBeNull();
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
      done();
    });
  });

  test('Runs testBiasDetection.js without errors', (done) => {
    const scriptPath = path.join(
      __dirname,
      '../services/media-processing-service/helpers/testBiasDetection.js'
    );
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      done();
    });
  });
});
