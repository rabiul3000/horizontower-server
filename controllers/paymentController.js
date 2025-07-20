const dotenv = require("dotenv");
dotenv.config();
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

const savePayment = async (req, res) => {
  const payment = req.body;
  const result = await Payment.create({
    ...payment,
  });
  return res.status(201).json(result);
};

module.exports = { createPaymentIntent, savePayment };
