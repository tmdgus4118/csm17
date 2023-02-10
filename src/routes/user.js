const express = require("express");
const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const jsonLog = require("../../src/utils/sheet1");
const all = require("../utils/sheet1");
const all2 = require("../utils/real");
const { getSchoolInfor, getFileInfor } = require("../utils/csmSheet1");
const { logger } = require("../../config/winston");

const { userTokenRequired } = require("../utils/auth");
const { userSignIn } = require("../services/userService");
const userRouter = express.Router();

userRouter.post("/user/signup", userController.userSignUp);
userRouter.post("/user/signin", userController.userSignIn);
userRouter.post(
  "/user/post/posting",
  userTokenRequired,
  userController.userPosting
);
userRouter.post("/json", getFileInfor); //db에  몽구스 Json타입으로 저장하기 ㅎㅎ//
userRouter.get("/user/search", userTokenRequired, userController.getExam);

module.exports = userRouter;
