const mongoose = require("mongoose");
require("mongoose-moment")(mongoose);
var moment = require("moment");
const { useContainer } = require("typeorm");

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  register_date: {
    type: String,
    default: moment().format("YYYYMMDD"),
  },
  register_time: {
    type: String,
    default: moment().format("YYYYMMDDhhmmss"),
  },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  nickname: { type: String, require: true },
  register_date: {
    type: String,
    default: moment().format("YYYY.MM.DD"),
  },
  status: { type: String, require: true },
});

const PostsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  adminId: { type: Number, require: true },
  register_date: {
    type: String,
    default: moment().format("YYYY.MM.DD"),
  },
  register_time: {
    type: String,
    default: moment().format("YYYYMMDDhhmmss"),
  },
  view: {
    type: Number,
    require: true,
  },
});

const PdfSchema = new mongoose.Schema({
  filename: { type: String, require: true },
  school: { type: String, require: true },
  fileurl: { type: String, require: true },
  userId: { type: Number, require: true },
  register_date: {
    type: String,
    default: moment().format("YYYYMMDD"),
  },
  register_time: {
    type: String,
    default: moment().format("YYYYMMDDhhmmss"),
  },
});

const DataRoomSchema = new mongoose.Schema({
  dataname: { type: String, require: true },
  register_date: {
    type: String,
    default: moment().format("YYYYMMDD"),
  },
});

const PaymentsSchema = new mongoose.Schema({
  imp_uid: { type: String, require: true },
  merchant_uid: { type: String, require: true },
  register_time: {
    type: String,
    default: moment().format("YYYYMMDDhhmmss"),
  },
});

module.exports = {
  AdminSchema,
  UserSchema,
  PostsSchema,
  PdfSchema,
  DataRoomSchema,
  PaymentsSchema,
};
