const express = require("express");
const { logger } = require("../../config/winston");
const adminRouter = require("./auth");
const userRouter = require("./user");

const router = express.Router();

router.use("/auth", adminRouter);
router.use("/auth", userRouter);

module.exports = router;
