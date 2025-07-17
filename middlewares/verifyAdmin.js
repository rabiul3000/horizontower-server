const User = require("../models/User.js");

const verifyAdmin = async (req, res, next) => {
  const user = req.user;
  const { email } = user;

  const findUser = await User.findOne({ email });
  if (findUser.role !== "admin") {
    return res.status(409).json({
      message: "You are not authorized",
    });
  } else {
    next();
  }
};

module.exports = verifyAdmin;
