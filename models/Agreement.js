// models/Agreement.js
const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    block: {
      type: String,
      required: true,
      trim: true,
    },
    apartmentNo: {
      type: String,
      required: true,
      trim: true,
    },
    apartmentId: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Agreement = mongoose.model("Agreement", agreementSchema);
module.exports = Agreement;
