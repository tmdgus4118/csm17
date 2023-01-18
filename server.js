require("dotenv").config();
const { createApp } = require("./app");
const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT;

const mongoUrl =
  "mongodb+srv://root:dnjstmdgus12@mongodbtutorial.qht8epf.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUrl);
    const app = createApp();
    console.log("MongoDb Connected!!");
    app.use(express.json());

    app.listen(PORT, () => {
      console.log(`Server Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

server();
