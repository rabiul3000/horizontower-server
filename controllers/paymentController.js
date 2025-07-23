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
  try {
    const result = await Payment.create({
      ...payment,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json("payment save error");
  }
};

const paymentHistory = async (req, res) => {
  const userEmail = req.user.email;
  try {
    const result = await Payment.find({ email: userEmail });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json("payment save error");
  }
};

module.exports = { createPaymentIntent, savePayment, paymentHistory };
