const mongoose = require("mongoose");
// require("mongoose-moment")(mongoose);
moment = require("moment");

const { useContainer } = require("typeorm");
const {
  AdminSchema,
  UserSchema,
  PostsSchema,
  PdfSchema,
  DataRoomSchema,
  PaymentsSchema,
} = require("../utils/schema");

const User = new mongoose.model("Users", UserSchema);
const Admin = new mongoose.model("Admin", AdminSchema);
const Post = new mongoose.model("Post", PostsSchema);
const Pdfs = new mongoose.model("pdf", PdfSchema);
const DataRoom = new mongoose.model("DataRoom", DataRoomSchema);
const Payments = new mongoose.model("Payments", PaymentsSchema);

const getAdminById = async (adminId) => {
  try {
    const admins = await Admin.findOne({ adminId: adminId });
    return admins;
  } catch (err) {
    console.log(err);
  }
};

const createAdmin = async (adminId, password) => {
  try {
    const admins = await Admin.create({
      adminId: adminId,
      password: password,
    });
    console.log("Success to Create Admin!!");
    return admins;
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async () => {
  try {
    const AllUsers = await User.find({});
    return AllUsers;
  } catch (err) {
    console.log(err);
  }
};

const getDashboard = async () => {
  try {
    console.log(
      "_____________________________START___________________________________"
    );
    const allAdmin = await Admin.count({
      register_time: { $lt: moment().format("YYYYMMDDhhmmss") },
    });
    const yesterdayAdmin = await Admin.count({
      register_time: { $lt: moment().format("YYYYMMDDhhmmss") - 1000000 },
    });

    if (allAdmin > yesterdayAdmin) {
      const increaseAdmin = allAdmin - yesterdayAdmin;
      console.log("어제보다 증가한 관리자수:", increaseAdmin);
    } else if (allAdmin < yesterdayAdmin) {
      const decreaseAdmin = yesterdayAdmin - allAdmin;
      console.log("어제보다 감소한 관리자수:", decreaseAdmin);
    } else {
      console.log("변화없음");
    }
    console.log(" 현재 총 관리자 숫자", allAdmin);
    console.log(
      "_____________________________AND_____________________________________"
    );
    const allPosts = await Post.count({
      register_time: { $lt: moment().format("YYYYMMDDhhmmss") },
    });
    const yesterdayPosts = await Post.count({
      register_time: { $lt: moment().format("YYYYMMDDhhmmss") - 1000000 },
    });
    if (allPosts > yesterdayPosts) {
      const increasePost = allPosts - yesterdayPosts;
      console.log("어제보다 증가한 게시물 수 :", increasePost);
    } else {
      console.log("변화 없음");
    }
    console.log("현재 총 게시물 갯수:", allPosts);
    console.log(
      "_____________________________AND_____________________________________"
    );

    const viewPosts = await Post.find({}).sort({ view: -1 }).limit(5);
    console.log("조회수 상위 5개 게시물:", viewPosts);

    console.log(
      "_____________________________AND_____________________________________"
    );

    const viewFiles = await Pdfs.find({}).sort({ _id: 1 }).limit(5);
    console.log("학교 정보:", viewFiles);
    console.log(
      "_____________________________AND_____________________________________"
    );

    const viewDatas = await DataRoom.find({}).sort({ _id: 1 }).limit(8);
    console.log("자료실:", viewDatas);

    console.log(
      "_____________________________END_____________________________________"
    );

    return { allPosts, allAdmin, viewPosts, viewFiles, viewDatas };

    //위에 로직은 유저의 변화를 나타내기 위한 로직이다. 하지만 DB에 유저 목록이 없어서 임시로 유저대신 관리자 목록으로 테스트함 정상적으로 출력됨. 추후 유저로 변경하면된다.
  } catch (err) {
    console.log(err);
  }
};

const adminPosting = async (title, content, adminId) => {
  try {
    const RandomViewNumber = Math.floor(Math.random() * 1000 + 1);
    const posts = await Post.create({
      title: title,
      content: content,
      adminId: adminId,
      view: RandomViewNumber,
    });
    console.log("Success to Posting!!");
    const allposts = await Post.count({});
    console.log(allposts);
    return posts;
  } catch (err) {
    console.log(err);
  }
};

const postPayments = async (imp_uid, merchant_uid) => {
  try {
    const payments = await Payments.create({
      imp_uid: imp_uid,
      merchant_uid: merchant_uid,
    });
    console.log("Success to create Payments!!");
    const allPayments = await Payments.find({});
    console.log(allPayments);
    return payments;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  Admin,
  getAdminById,
  createAdmin,
  getAllUser,
  getDashboard,
  adminPosting,
  postPayments,
  Payments,
};
