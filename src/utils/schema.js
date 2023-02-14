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

const testSchema = new mongoose.Schema([
  {
    Number1: String,
    OrderData: String,
    PayCard: String,
    SaleSite: String,
    MarketOrderNumber: String,
    ProductName: String,
    Option: String,
    Quantity: String,
    BuyerName: String,
    PassNumber: String,
    BuyerNumber: String,
    Price: String,
    DelieveryPrice: String,
    TotalPrice: String,
    CountryBuyPrice: String,
    RealPrice: String,
    Dollar: String,
    Count: String,
    RealCount: String,
    Delivery: String,
    DeliveryMethod: String,
    RealWeight: String,
    OpenMarketPee: String,
    OpenMarketMoney: String,
    PassMoney: String,
    VolunterrMoney: String,
    UsedMoneySum: String,
    WorkingMoney: String,
    GetMoney: String,
    OpenMarketGetMoney: String,
    Percentage: String,
    Special: String,
    Number: String,
  },
]);

const SchoolSchema = new mongoose.Schema([
  {
    Number: String,
    SchoolName: String,
    SchoolLocation: String,
    SchoolTestDuration: String,
    FirstGradeExaminationRanking: String,
    SecondGradeExaminationRanking: String,
    ThirdGradeExaminationRanking: String,
  },
]);

const ExamFileSchema = new mongoose.Schema([
  {
    FileWriter: String,
    FileCheker: String,
    Type: String,
    DownloadLink: String,
    Created_At: {
      type: String,
      default: moment().format("YYYYMMDDhhmmss"),
    },
    Updated_At: {
      type: String,
      default: moment().format("YYYYMMDDhhmmss"),
    },
    RequestMessage: String,
    RequestWriter: String,
    RequestDate: {
      type: String,
      default: moment().format("YYYYMMDDhhmmss"),
    },
  },
]);

const DailyLogSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  download_url: {
    type: String,
    required: true,
  },
  uploaded_at: {
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
  JsonSchema,
  testSchema,
  SchoolSchema,
  ExamFileSchema,
  DailyLogSchema,
  fileSchema,
};
