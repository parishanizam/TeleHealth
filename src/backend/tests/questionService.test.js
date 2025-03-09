const request = require('supertest');
const app = require('../server'); 

describe('Question Service', () => {
  test('GET /questions/english/matching/1 should return correct JSON', async () => {
    const res = await request(app).get('/questions/english/matching/1');

    // Expect a 200 status
    expect(res.status).toBe(200);

    // Expect the top-level fields to match the actual structure:
    // {
    //   "id": 1,
    //   "title": "The girl has the apples",
    //   "sound": "...",
    //   "options": [ { "id": "a", "image": "..." }, ... ],
    //   "correctAnswer": "b"
    // }
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        sound: expect.any(String),
        correctAnswer: expect.any(String),
        options: expect.any(Array)
      })
    );

    // If you specifically expect id = 1 and correctAnswer = 'b', you can do:
    expect(res.body.id).toBe(1);
    expect(res.body.correctAnswer).toBe('b');

    // Check each option’s shape
    expect(res.body.options.length).toBeGreaterThan(0);
    res.body.options.forEach(option => {
      expect(option).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          image: expect.any(String)
        })
      );
    });
  });
});
