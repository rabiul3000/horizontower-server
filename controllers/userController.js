const Agreement = require("../models/Agreement.js");
const Apartment = require("../models/Apartment.js");
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

const allUsers = async (req, res) => {
  try {
    const email = req.query.email;
    const users = await User.find({ email: { $ne: email } });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getUser = async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  return res.status(200).json(user);
};

const userExists = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  return res.status(200).json(user);
};

const usersForAdmin = async (req, res) => {
  try {
    console.log("hello world");
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users", error });
  }
};
const removeMemberToUser = async (req, res) => {
  try {
    const { email, newRole } = req.body;

    if (!email || !newRole) {
      return res.status(400).json({ error: "Missing data" });
    }

    if (newRole === "user") {
      // Find all agreements for the user
      const agreements = await Agreement.find({ email });

      // For each agreement, update apartment status to "available"
      for (const agreement of agreements) {
        if (agreement.apartmentId) {
          await Apartment.findByIdAndUpdate(agreement.apartmentId, {
            status: "available",
          });
        }
      }

      // Delete all agreements for the user
      await Agreement.deleteMany({ email });
    }

    // Update user role last to ensure atomicity in your logic flow
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: newRole },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  allUsers,
  getUser,
  userExists,
  usersForAdmin,
  removeMemberToUser,
};
