const clinicianController = require('../services/authentication-service/controllers/clinician.controller');
const clinicianModel = require('../services/authentication-service/models/cliniciansModel');
const bcrypt = require('bcrypt');

jest.mock('../services/authentication-service/models/cliniciansModel');
jest.mock('bcrypt');

describe('Authentication Service', () => {
  test('should register a new clinician', async () => {
    clinicianModel.getClinicianByUsername.mockResolvedValue(null);
    clinicianModel.createClinician.mockResolvedValue({ username: 'drjohndoe' });

    const req = { 
      body: { 
        firstname: 'John', 
        lastname: 'Doe', 
        username: 'drjohndoe', 
        email: 'john@example.com', 
        password: 'password' 
      } 
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await clinicianController.clinicianSignup(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Clinician created', user: { username: 'drjohndoe' } });
  });

  test('should return error for existing username', async () => {
    clinicianModel.getClinicianByUsername.mockResolvedValue({ username: 'existingUser' });

    const req = { body: { username: 'existingUser' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await clinicianController.clinicianSignup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('should login a clinician with valid credentials', async () => {
    clinicianModel.getClinicianByUsername.mockResolvedValue({ passwordHash: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(true);

    const req = { body: { username: 'drjohndoe', password: 'password' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await clinicianController.clinicianLogin(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
