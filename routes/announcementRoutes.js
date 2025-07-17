// routes/userRoutes.js
const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const { makeAnnouncement, allAnnouncements } = require("../controllers/announcementController.js");

const router = express.Router();

router.get("/all", allAnnouncements);
router.post("/make", verifyAdmin, makeAnnouncement);

module.exports = router;
