const Payment = require("../models/Payment.js");

const verifyPayment = async (req, res, next) => {
  try {
    const { apartmentId, month, year } = req.body;

    if (!apartmentId || !month || !year) {
      return res.status(400).json({ error: "Missing required payment data" });
    }

    // Check if a payment already exists with same apartmentId, month, and year
    const existingPayment = await Payment.findOne({
      apartmentId,
      month,
      year,
      status: "paid",
    });

    if (existingPayment) {
      return res.status(409).json(`Payment already paid for ${month},${year}`);
    }

    // Continue to the payment intent creation
    next();
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

module.exports = verifyPayment;
