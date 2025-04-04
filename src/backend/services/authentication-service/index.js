/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Sets up and combines route modules for clinicians, parents, and clients.
 */

const express = require("express");
const router = express.Router();

const clinicianRoutes = require("./routes/clinician.routes");
const parentRoutes = require("./routes/parent.routes");
const clientRoutes = require("./routes/client.routes");

router.use("/clinicians", clinicianRoutes);
router.use("/parents", parentRoutes);
router.use("/clinicians", clientRoutes);

module.exports = router;
