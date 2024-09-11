const paymentControllers = require("../controllers/paymentControllers");
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.post("/api/payment/initiate", auth, paymentControllers.initiatePayment);
router.post("/api/payment/verify", auth, paymentControllers.verifyPayment);

module.exports = router;