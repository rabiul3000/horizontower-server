const Agreement = require("../models/Agreement");

const createAgreement = async (req, res) => {
  const { apartment, user } = req.body;

  const newAgreement = new Agreement({
    userName: user.displayName,
    userEmail: user.email,
    floor: apartment.floor,
    block: apartment.block,
    apartmentNo: apartment.apartmentNo,
    rent: apartment.rent,
    status: "pending",
  });

  const saveAgreement = await newAgreement.save();
  return res
    .status(201)
    .json({ message: "Agreement created successfully", saveAgreement });
};

module.exports = {
  createAgreement,
};
