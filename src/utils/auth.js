const jwt = require("jsonwebtoken");
const { SimpleConsoleLogger } = require("typeorm");
const userDao = require("../models/userDao");
require("dotenv").config();

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

const userTokenRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new Error("User Authorization Not Existed!!!");
    error.statusCode = 401;
    return next(error);
  }
  const id = await jwt.verify(authorization, process.env.UserJWT_SECRET)._id;

  const user = await userDao.getUserByIdd(ids);

  if (!user) {
    const error = new Error("User Not Existed!!");
    error.statusCode = 404;
    return next(error);
  }
  req.user = user;
  next();
};

module.exports = { adminTokenRequired, userTokenRequired };
