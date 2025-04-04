/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: December 5th 2024
 * Purpose: Initializes and configures the Express server with CORS, JSON parsing,
 * environment variables, and route registration. Starts the server on the specified port.
 */

require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
app.use(cors());
app.use(express.json());              
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
