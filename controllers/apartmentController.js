// controllers/apartmentController.js
const Apartment = require("../models/Apartment");

const allApartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const fromRange = parseInt(req.query.fromRange) || 1215;
    const toRange = parseInt(req.query.toRange) || 4900;

    // Filter apartments by rent range before pagination
    const filter = {
      rent: { $gte: fromRange, $lte: toRange },
    };

    const apartments = await Apartment.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Apartment.countDocuments(filter);

    res.status(200).json({
      data: apartments,
      currentPage: page,
      total: total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch apartments", error });
  }
};

module.exports = {
  allApartments,
};
