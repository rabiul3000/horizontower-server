// routes/index.js
const express = require("express");
const userRoutes = require("./userRoutes.js");
const apartmentRoutes = require("./apartmentRoutes.js");
const agreementRoutes = require("./agreementRoutes.js");
const announcementRoutes = require("./announcementRoutes.js");
const couponRoutes = require("./couponRoutes.js");

const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

// user routes
router.use("/user", userRoutes);
router.use("/apartment", apartmentRoutes);
router.use("/agreement", verifyToken, agreementRoutes);
router.use("/announcement", verifyToken, announcementRoutes);
router.use("/coupon", couponRoutes);

module.exports = router;
