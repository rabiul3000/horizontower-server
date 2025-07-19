const Coupon = require("../models/Coupon");

const allCoupons = async (req, res) => {
  const coupons = await Coupon.find({});

  return res.status(200).json(coupons);
};

const createCoupon = async (req, res) => {
  const { code, discount, description } = req.body;

  if (!code || !discount || !description) {
    return res.status(400).json("All fields are required");
  }

  const newCoupon = await Coupon.create({
    code,
    discount,
    description,
  });

  return res.status(201).json(newCoupon);
};

const couponsStatusChange = async (req, res) => {
  const { couponId, status } = req.body;

  const changeTo = status === "active" ? "inactive" : "active";

  if (!couponId || !status) {
    return res.status(400).json("All fields are required");
  }
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    couponId,
    { status: changeTo },
    { new: true }
  );

  return res.status(200).json(updatedCoupon);
};

const validateCoupon = async(req, res) => {
  const couponCode = req.body.couponCode;

  const coupon = await Coupon.findOne({ code: couponCode });
  console.log(coupon);
  
  if (!coupon) {
    return res.status(404).json("Coupon not found");
  }
  if (coupon.status !== "active") {
    return res.status(400).json("Coupon is not active");
  }
  return res.status(200).json(coupon.discount);
};

module.exports = {
  allCoupons,
  createCoupon,
  couponsStatusChange,
  validateCoupon,
};
