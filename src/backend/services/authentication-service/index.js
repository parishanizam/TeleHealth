const express = require("express");
const router = express.Router();

const clinicianRoutes = require("./routes/clinician.routes");
const parentRoutes = require("./routes/parent.routes");
const clientRoutes = require("./routes/client.routes");

router.use("/clinicians", clinicianRoutes);
router.use("/parents", parentRoutes);
router.use("/clinicians", clientRoutes);

module.exports = router;
