require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mediaRoutes = require('./routes/media.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/media', mediaRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Media Processing Service running on port ${PORT}`);
});
