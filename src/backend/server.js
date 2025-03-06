// Load environment variables early
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Explicitly allow frontend URL in CORS
const allowedOrigins = [
  'https://telethealthinsights.netlify.app',  // ✅ Your deployed frontend URL
  'http://localhost:3000'                     // ✅ Allow local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());              
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on https://telehealth-insights.onrender.com:${PORT}`);
});
