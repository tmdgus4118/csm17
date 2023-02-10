require("dotenv").config();
const mongoose = require("mongoose");
const userService = require("../services/userService");
const { google } = require("googleapis");
const keys = require("../../sheetKey.json");
var requestIp = require("request-ip");

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("You have to enter email and password both!!");
    }
    const userAccessToken = await userService.userSignIn(email, password);
    return res.status(201).json({ userAccessToken: userAccessToken });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const userSignUp = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    if (!email || !nickname || !password) {
      throw new Error("You have to Enter all email , nickname , password!!");
    }
    await userService.userSignUp(email, nickname, password);
    return res.status(201).json({ message: "Success to Join!!" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const userPosting = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new Error("You have to Enter title and content both");
    }
    await userService.userPosting(title, content);
    return res.status(201).json({ message: "Complete to Create Posting" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getExam = async (req, res) => {
  try {
    const { examType } = req.query;

    const result = await userService.getExam(examType);
    return res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = { userSignUp, userSignIn, userPosting, getExam };
