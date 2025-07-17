// routes/userRoutes.js
const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const {
  allApartments,
  apartmentsForAdmin,
} = require("../controllers/apartmentController.js");
const router = express.Router();

router.get("/apartments_for_admin", verifyToken,verifyAdmin, apartmentsForAdmin);
router.get("/all", allApartments);

module.exports = router;
