// routes/userRoutes.js
const express = require("express");
const { allApartments } = require("../controllers/apartmentController.js");
const router = express.Router();

router.get("/all", allApartments);

module.exports = router;
