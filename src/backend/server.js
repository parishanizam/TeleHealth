require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
app.use(cors( { origin: "https://telethealthinsights.netlify.app"}));
app.use(express.json());              
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on https://telehealth-insights.onrender.com:${PORT}`);
});
