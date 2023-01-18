const express = require("express");

const adminController = require("../controllers/authController");

const router = express.Router();

router.post("/admin/signin", adminController.adminSignIn); //관리자 로그인기능
router.post("/admin/signup", adminController.adminSignUp); //관리가 회원가입기능

module.exports = router;
