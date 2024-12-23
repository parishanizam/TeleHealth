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
app.use('/auth', require('./services/authentication-service'));
app.use('/media', require('./services/media-processing-service'));
app.use('/storage', require('./services/data-storage-service'));
app.use('/reports', require('./services/report-generation-service'));
app.use('/feedback', require('./services/real-time-feedback-service'));
app.use('/admin', require('./services/admin-service'));
app.use('/logs', require('./services/logging-monitoring-service'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
