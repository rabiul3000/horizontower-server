// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUser,
  allUsers,
  getUser,
  userExists,
  removeMemberToUser,
} = require("../controllers/userController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const verifyUser = require("../middlewares/verifyUser.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");

router.get("/get_user", verifyToken, verifyUser, getUser);
router.post("/create", createUser);
router.get("/user_exist/:email", userExists);
router.get("/all", verifyToken, verifyAdmin, allUsers);
router.patch("/remove_member_to_user", verifyToken, verifyAdmin, removeMemberToUser);

module.exports = router;
