const User = require("../models/User.js");

const createUser = async (req, res) => {
  try {
    const { name, email, photoURL, role } = req.body;

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      photoURL,
      role,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const allUsers = (req, res) => {
  res.status(201).json("allUsers");
};

module.exports = {
  createUser,
  allUsers,
};
