const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const adminSignIn = async (adminId) => {
  const admin = await userDao.getAdminById(adminId);
  if (!admin) {
    const err = new Error("Specified Admin does not exist!!!");
    err.statusCode = 404;
    throw err;
  }
  const adminAccessToken = jwt.sign(
    { adminId: adminId },
    process.env.JWT_SECRET
  );
  return adminAccessToken;
};

module.exports = { adminSignIn };
