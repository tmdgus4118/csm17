const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");
const { logger } = require("../../config/winston");

const userSignIn = async (email, password) => {
  const user = await userDao.getUserById(email);
  console.log(user);

  if (!user) {
    const err = new Error("Spectified User does not exist!!");
    err.statusCode = 404;
    throw err;
  }
  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    const err = new Error("invalid password!!");
    err.statusCode = 401;
    throw err;
  }
  const userAccessToken = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET1
  );
  // logger.info(`User ${user.email} Log in `);
  return userAccessToken;
};

const userSignUp = async (email, nickname, password) => {
  const user = await userDao.getUserById(email);
  const userNick = await userDao.getUserByNickName(nickname);

  if (user || userNick) {
    const err = new Error(
      "Duplicated user email or nickname!! User another email and nickname!!"
    );
    err.statusCode = 400;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await userDao.createUser(email, nickname, hashedPassword);
};

const userPosting = async (title, content) => {
  const userpost = await userDao.userPosting(title, content);
  return userpost;
};

const getExam = async (examType) => {
  return userDao.getExam(examType);
};

module.exports = { userSignUp, userSignIn, userPosting, getExam };
