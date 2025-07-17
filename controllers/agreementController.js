const { default: mongoose } = require("mongoose");
const Agreement = require("../models/Agreement");
const Apartment = require("../models/Apartment");

const createAgreement = async (req, res) => {
  const { apartment, user } = req.body;


  const dbApartment = await Apartment.findById(apartment._id);
  if (!dbApartment) {
    return res.status(404).json({ message: "Apartment not found" });
  }

  if (dbApartment.status === "not_available") {
    return res
      .status(400)
      .json({ message: "Apartment is already in agreement" });
  }
  dbApartment.status = "not_available";
  await dbApartment.save();

  const newAgreement = new Agreement({
    name: user.displayName,
    email: user.email,
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
