require("dotenv").config();
const authService = require("../services/authService");

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

module.exports = { adminSignIn, adminSignUp };
