const mongoose = require("mongoose");
require("mongoose-moment")(mongoose);
var moment = require("moment");
const { useContainer } = require("typeorm");

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, require: true },
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
  email: { type: String },
  nickname: { type: String },
  password: { type: String },
  register_date: {
    type: String,
    default: moment().format("YYYY.MM.DD"),
  },
  status: { type: Number },
});

const PostsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  adminId: { type: Number },
  userId: { type: Number },
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
  pay_method: { type: String, require: true },
  amount: { type: Number, require: true },
  buyer_tel: { type: String, require: true },
  register_time: {
    type: String,
    default: moment().format("YYYYMMDDhhmmss"),
  },
});

const JsonSchema = new mongoose.Schema([
  {
    Num: String,
    name: String,
    start: String,
    desc: String,
    url: String,
  },
]);

const npmSchema = new mongoose.Schema({});

module.exports = {
  AdminSchema,
  UserSchema,
  PostsSchema,
  PdfSchema,
  DataRoomSchema,
  PaymentsSchema,
  JsonSchema,
  npmSchema,
};
