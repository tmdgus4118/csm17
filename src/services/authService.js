const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");

const adminSignIn = async (adminId, password) => {
  const admin = await userDao.getAdminById(adminId);
  if (!admin) {
    const err = new Error("Specified Admin does not exist!!!");
    err.statusCode = 404;
    throw err;
  }
  const result = await bcrypt.compare(password, admin.password);

  if (!result) {
    const err = new Error("invalid password!!");
    err.statusCode = 401;
    throw err;
  }

  const adminAccessToken = jwt.sign(
    { adminId: adminId },
    process.env.JWT_SECRET
  );
  return adminAccessToken;
};

const adminSignUp = async (adminId, password) => {
  const admin = await userDao.getAdminById(adminId);
  if (admin) {
    const err = new Error("duplicated adminId! Use another adminId!");
    err.statusCode = 400;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userDao.createAdmin(adminId, hashedPassword);
};

module.exports = { adminSignIn, adminSignUp };
