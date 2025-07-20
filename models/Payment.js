const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    apartmentNo: {
      type: String,
      required: true,
    },
    apartmentId: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    coupon: {
      type: String,
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["paid", "failed"],
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
