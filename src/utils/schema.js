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

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    phone: { type: Number, require: true },
  },
  { timestamps: true }
);

const PostsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  adminId: { type: Number, require: true },
  register_date: {
    type: String,
    default: moment().format("YYYYMMDD"),
  },
  register_time: {
    type: String,
    default: moment().format("YYYYMMDDhhmmss"),
  },
});

module.exports = { AdminSchema, UserSchema, PostsSchema };
