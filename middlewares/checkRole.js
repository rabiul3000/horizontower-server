const User = require("../models/User.js");

const isUser = async (req, res, next) => {
  const { user } = req.body;
  const { email } = user;

  const findUser = await User.findOne({ email });
  console.log(email, findUser);
  if (findUser.role !== "user") {
    return res.status(409).json({
      message: "You are not authorized",
    });
  } else {
    next();
  }
};

module.exports = {
  isUser,
};
