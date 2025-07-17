// models/Apartment.js
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    image: {
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
      unique: true,
    },
    rent: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "not_available"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Apartment = mongoose.model("Apartment", apartmentSchema);
module.exports = Apartment;
