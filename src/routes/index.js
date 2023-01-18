const express = require("express");

const adminRouter = require("./auth");

const router = express.Router();

router.use("/auth", adminRouter);

module.exports = router;
