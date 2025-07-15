// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, allUsers } = require("../controllers/userController");



router.post("/create", createUser);
router.post("/all", allUsers);

module.exports = router;
