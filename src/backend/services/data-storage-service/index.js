require('dotenv').config();
const express = require('express');
const cors = require('cors');

//For Dev: Still need to add the video upload routes and everything AWS related still

// MongoDB connection
const connectDB = require('./config/db');

// Import any routes you need
const testSessionRoutes = require('./routes/testSession.routes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount your routes
app.use('/test-sessions', testSessionRoutes);

// Health-check or root endpoint
app.get('/', (req, res) => {
  res.send('Data Storage Service is running');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Data Storage Service running on port ${PORT}`);
});
