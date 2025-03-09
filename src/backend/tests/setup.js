const app = require('../server');
let server;

beforeAll((done) => {
  // Listen on a test port (0 picks a random open port)
  server = app.listen(0, () => {
    console.log(`Test server running on port ${server.address().port}`);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});
