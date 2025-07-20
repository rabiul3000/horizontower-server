// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const verifyMember = require("../middlewares/verifyMember.js");
const { createPaymentIntent, savePayment } = require("../controllers/paymentController.js");
const verifyPayment = require("../middlewares/verifyPayment.js");

router.post("/create-intent", verifyPayment, createPaymentIntent);
router.post("/save", verifyMember, savePayment);

module.exports = router;
