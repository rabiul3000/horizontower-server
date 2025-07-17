const Agreement = require("../models/Agreement");

const isAgreementExist = async (req, res, next) => {
  const { user } = req.body;
  const { email } = user;

  const findAgreement = await Agreement.findOne({ email });

  if (findAgreement) {
    return res.status(409).json({
      message: "You already in one agreement",
    });
  } else {
    next();
  }
};

module.exports = {
  isAgreementExist,
};
