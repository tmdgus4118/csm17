require("dotenv").config();
const authService = require("../services/authService");

//관리자 로그인 기능//
const adminSignIn = async (req, res) => {
  try {
    const { adminId, password } = req.body;
    if (!adminId || !password) {
      throw new Error("Key Error!");
    }
    const adminAccessToken = await authService.adminSignIn(adminId, password);

    return res.status(201).json({ adminAccessToken: adminAccessToken });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

//관리자 회원가입 기능  admincode는 .env파일에서 관리//
const adminSignUp = async (req, res) => {
  try {
    const { adminId, password, admincode } = req.body;
    if (
      !adminId ||
      !password ||
      !admincode ||
      admincode !== process.env.AdminCode
    ) {
      throw new Error("You have to Enter all adminId , password , admincode!!");
    }
    await authService.adminSignUp(adminId, password);
    return res.status(201).json({ message: "Complete" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

//모든 유저 불러오기 기능//

const getAllUser = async (req, res) => {
  const usersList = await authService.getAllUser();
  res.status(200).json(usersList);
};

//대시보드에서 다양한 정보 불러오기

const getDashboard = async (req, res) => {
  const dataList = await authService.getDashboard();
  res.status(200).json(dataList);
};

const adminPosting = async (req, res) => {
  try {
    const { title, content, adminId } = req.body;
    if (!title || !content || !adminId) {
      throw new Error("You have to Enter all adminId , password , admincode!!");
    }
    await authService.adminPosting(title, content, adminId);
    return res.status(201).json({ message: "Complete" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  adminSignIn,
  adminSignUp,
  getAllUser,
  getDashboard,
  adminPosting,
};
