require("dotenv").config();
const { createApp } = require("./app");
const getServerIp = require("./config/winston");
var requestIp = require("request-ip");
const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const { logger } = require("./config/winston.js");
const request = require("request");

const mongoUrl = process.env.DBURL;
const blockedIps = ["127.0.0.1"];
const server = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUrl);
    const app = createApp();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    console.log("MongoDb Connected!!");

    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Welcome to the server");
      const { logger } = require("./config/winston.js");
      logger.info(`Client has successfully accessed!!      `);
    });

    app.listen(PORT, () => {
      console.log(`Server Listening on port ${PORT}`);
      logger.info(`Server Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
