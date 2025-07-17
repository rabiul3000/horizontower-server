// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes.js");
const apartmentRoutes = require("./apartmentRoutes.js");
const agreementRoutes = require("./agreementRoutes.js");
const announcementRoutes = require("./announcementRoutes.js");
const verifyToken = require("../middlewares/verifyToken.js");
const verifyUser = require("../middlewares/verifyUser.js");

const router = express.Router();

// user routes
router.use("/user", userRoutes);
router.use("/apartment", apartmentRoutes);
router.use("/agreement", verifyToken, verifyUser, agreementRoutes);
router.use("/announcement", verifyToken, announcementRoutes);

module.exports = router;
