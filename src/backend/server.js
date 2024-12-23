const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health Check
app.get('/ping', (req, res) => {
    res.send({ message: 'API Gateway is working!' });
});

// Placeholder Routes for Microservices
app.use('/auth', (req, res) => res.send({ message: 'Authentication Service' }));
app.use('/media', (req, res) => res.send({ message: 'Media Processing Service' }));
app.use('/storage', (req, res) => res.send({ message: 'Data Storage Service' }));
app.use('/reports', (req, res) => res.send({ message: 'Report Generation Service' }));
app.use('/feedback', (req, res) => res.send({ message: 'Real-Time Feedback Service' }));
app.use('/admin', (req, res) => res.send({ message: 'Admin Service' }));
app.use('/logs', (req, res) => res.send({ message: 'Logging and Monitoring Service' }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
