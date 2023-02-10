const { localservices } = require("googleapis/build/src/apis/localservices");
const jwt = require("jsonwebtoken");
const { SimpleConsoleLogger } = require("typeorm");

require("dotenv").config();

const adminTokenRequired = async (req, res, next) => {
  const userDao = require("../models/userDao");
  const { logger } = require("../../config/winston");
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const error = new Error("Admin Authorization Not Existed!!!");
      error.statusCode = 401;
      return next(error);
    }
    const adminId = (await jwt.verify(authorization, process.env.JWT_SECRET))
      .adminId;

    logger.info(` Admin Id: ${adminId}`);
    const admin = await userDao.getAdminById(adminId);

    if (!admin) {
      const error = new Error("Admin Not Existed!!");
      error.statusCode = 404;
      return next(error);
    }
    req.admin = admin;
    next();
  } catch (err) {
    console.error(err);
    const error = new Error("Admin Token Verification Failed!!!");
    error.statusCode = 401;
    return next(error);
  }
};

const userTokenRequired = async (req, res, next) => {
  const userDao = require("../models/userDao");
  const { logger } = require("../../config/winston");
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error("Authorization Not Existed!!");
      error.statusCode = 401;
      return next(error);
    }

    let userEmail;
    try {
      userEmail = await jwt.verify(authorization, process.env.JWT_SECRET1)
        .email;
    } catch (err) {
      const error = new Error("Token is invalid");
      error.statusCode = 401;
      return next(error);
    }

    logger.info(`User Log In ! User Id : ${userEmail}`);
    const user = await userDao.getUserById(userEmail);

    if (!user) {
      const error = new Error("User Not existed!!");
      error.statusCode = 404;
      return next(error);
    }
    req.user = user;
  } catch (err) {
    console.log(err);
    return next(err);
  }
  next();
};

module.exports = { adminTokenRequired, userTokenRequired };
