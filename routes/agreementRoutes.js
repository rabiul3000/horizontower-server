// routes/userRoutes.js
const express = require("express");
const { createAgreement, allAgreements, acceptAgreement, rejectAgreement, getAgreementByMember } = require("../controllers/agreementController.js");
const { isUser } = require("../middlewares/checkRole.js");
const { isAgreementExist } = require("../middlewares/isAgreementExist.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");
const verifyMember = require("../middlewares/verifyMember.js");
const router = express.Router();

router.post("/create", isUser, isAgreementExist, createAgreement);

router.get("/all", verifyAdmin, allAgreements);
router.patch("/accept/:id", verifyAdmin, acceptAgreement);
router.patch("/reject/:id", verifyAdmin, rejectAgreement);

router.get("/:email", verifyMember, getAgreementByMember);

module.exports = router;
