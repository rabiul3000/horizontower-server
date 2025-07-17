// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, allUsers, getUser } = require("../controllers/userController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const verifyUser = require("../middlewares/verifyUser.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");

router.post("/create", createUser);
router.get("/", verifyToken, verifyUser, getUser);

router.get("/all",verifyToken, verifyAdmin, allUsers);

module.exports = router;
