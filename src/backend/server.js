// Load environment variables early
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

// Import the central router
const routes = require('./routes');

// Create Express app
const app = express();

// Global Middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());              
app.use(express.urlencoded({ extended: true }));

// Mount all routes
// (i.e., /ping, /auth, /media, etc.)
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
