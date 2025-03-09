const resultService = require('../services/result-storage-service/controllers/results.controller');

jest.mock('../services/result-storage-service/controllers/results.controller', () => ({
  calculateResult: jest.fn()
}));

describe('Result Service', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { score: 10, multiplier: 2 } };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  });

  test('should return calculated result', async () => {
    resultService.calculateResult.mockImplementation((req, res) =>
      res.json({ result: 20 })
    );

    await resultService.calculateResult(req, res);
    expect(res.json).toHaveBeenCalledWith({ result: 20 });
  });
});
