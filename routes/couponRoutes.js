// routes/userRoutes.js
const express = require("express");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const { allCoupons, createCoupon, couponsStatusChange, validateCoupon } = require("../controllers/couponController.js");
const verifyMember = require("../middlewares/verifyMember.js");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();

router.get("/all",  allCoupons);
router.post("/create", verifyAdmin, createCoupon);

router.patch("/change_status", verifyAdmin, couponsStatusChange);
router.post("/validate", verifyToken, verifyMember, validateCoupon);

module.exports = router;
