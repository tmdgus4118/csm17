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

module.exports = { adminSignIn };
