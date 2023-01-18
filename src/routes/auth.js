const express = require("express");

const adminController = require("../controllers/authController");

const router = express.Router();

router.post("/admin/signin", adminController.adminSignIn);

module.exports = router;
