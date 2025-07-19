const { default: mongoose } = require("mongoose");
const Agreement = require("../models/Agreement");
const Apartment = require("../models/Apartment");
const User = require("../models/User");

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
    apartmentId: apartment._id,
    rent: apartment.rent,
    status: "pending",
  });

  const saveAgreement = await newAgreement.save();
  return res
    .status(201)
    .json({ message: "Agreement created successfully", saveAgreement });
};

const allAgreements = async (req, res) => {
  try {
    const agreements = await Agreement.find({ status: "pending" });
    res.status(200).json(agreements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch agreements" });
  }
};

const acceptAgreement = async (req, res) => {
  try {
    const agreementId = req.params.id;
    const updatedAgreement = await Agreement.findByIdAndUpdate(
      agreementId,
      { status: "accepted" },
      { new: true }
    );

    const updatedUser = await User.findOneAndUpdate(
      { email: updatedAgreement.email },
      { role: "member" },
      { new: true }
    );

    return res.status(200).json({ message: "Agreement accepted successfully" });
  } catch (error) {
    return res.status(500).json("An Error fetching agreements try again!");
  }
};
const rejectAgreement = async (req, res) => {
  try {
    const agreementId = req.params.id;
    const agreement = await Agreement.findById(agreementId);
    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    await Apartment.findByIdAndUpdate(
      agreement.apartmentId,
      { status: "available" },
      { new: true }
    );

    await Agreement.findByIdAndDelete(agreementId);

    return res.status(200).json("Agreement rejected successfully");
  } catch (error) {
    return res.status(500).json("An Error fetching agreements try again!");
  }
};

const getAgreementByMember = async (req, res) => {
  const { email } = req.params;
  const agreement = await Agreement.find({ email });
  if(!agreement){
    return res.status(404).json({ message: "Agreement not found" });
  }

  return res.status(200).json(...agreement);
};

module.exports = {
  createAgreement,
  allAgreements,
  acceptAgreement,
  rejectAgreement,
  getAgreementByMember,
};
