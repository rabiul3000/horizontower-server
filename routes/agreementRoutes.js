// routes/userRoutes.js
const express = require("express");
const { createAgreement } = require("../controllers/agreementController.js");
const { isUser } = require("../middlewares/checkRole.js");
const router = express.Router();

router.post("/create", isUser, createAgreement);

module.exports = router;
