const express = require('express');
const router = express.Router();

const clinicianRoutes = require('./routes/clinician.routes');
const parentRoutes = require('./routes/parent.routes');
const clientRoutes = require('./routes/client.routes');

// e.g. /auth/clinicians
router.use('/clinicians', clinicianRoutes);

// add-client route for clinicians
router.use('/clinicians', clientRoutes);

// e.g. /auth/parents
router.use('/parents', parentRoutes);

module.exports = router;
