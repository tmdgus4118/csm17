const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const adminTokenRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const error = new Error("Admin Authorization Not Existed!!!");
    error.statusCode = 401;
    return next(error);
  }
  const adminId = await jwt.verify(authorization, process.env.JWT_SECRET)
    .adminId;
  const admin = await userDao.getAdminById(adminId);
  if (!admin) {
    const error = new Error("Admin Not Existed!!");
    error.statusCode = 404;
    return next(error);
  }
  req.admin = admin;
  next();
};

module.exports = { adminTokenRequired };
