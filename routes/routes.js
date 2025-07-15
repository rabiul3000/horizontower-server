// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes.js");
const apartmentRoutes = require("./apartmentRoutes.js");
const agreementRoutes = require("./agreementRoutes.js");

const router = express.Router();

// user routes
router.use("/user", userRoutes);
router.use("/apartment", apartmentRoutes);
router.use("/agreement", agreementRoutes);

module.exports = router;
