// controllers/apartmentController.js
const Apartment = require("../models/Apartment");

const allApartments = async (req, res) => {
  try {
    const { page, limit, fromRange, toRange } = req.query;

    let filter = {};
    let isRangeFilter = false;

    // Add rent range filter if present
    if (fromRange && toRange) {
      filter.rent = {
        $gte: parseInt(fromRange),
        $lte: parseInt(toRange),
      };
      isRangeFilter = true;
    }

    let query = Apartment.find(filter);

    // Only apply pagination when not doing a range search
    let currentPage = null;
    let totalPages = null;

    if (!isRangeFilter) {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 6;
      const skip = (pageNum - 1) * limitNum;

      query = query.skip(skip).limit(limitNum);

      const total = await Apartment.countDocuments(filter);
      currentPage = pageNum;
      totalPages = Math.ceil(total / limitNum);
    }

    const apartments = await query.exec();
    const total = await Apartment.countDocuments(filter);

    const response = {
      data: apartments,
      total,
    };

    if (!isRangeFilter) {
      response.currentPage = currentPage;
      response.totalPages = totalPages;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Apartment Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch apartments", error });
  }
};


const apartmentsForAdmin = async (req, res) => {
  try {
    const apartments = await Apartment.find({});
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch apartments", error });
  }
};

module.exports = {
  allApartments,
  apartmentsForAdmin,
};
