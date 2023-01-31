require("dotenv").config();
const mongoose = require("mongoose");
const authService = require("../services/authService");
const Payments = require("../models/userDao.js");
const Imp_key = process.env.Imp_key;
const Imp_secret = process.env.Imp_secret;
const axios = require("axios");

//관리자 로그인 기능//
const adminSignIn = async (req, res) => {
  try {
    const { adminId, password } = req.body;
    if (!adminId || !password) {
      throw new Error("Key Error!");
    }
    const adminAccessToken = await authService.adminSignIn(adminId, password);
    console.log(Imp_key, Imp_secret);

    return res.status(201).json({ adminAccessToken: adminAccessToken });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

//관리자 회원가입 기능  admincode는 .env파일에서 관리//
const adminSignUp = async (req, res) => {
  try {
    const { adminId, password, admincode } = req.body;
    if (
      !adminId ||
      !password ||
      !admincode ||
      admincode !== process.env.AdminCode
    ) {
      throw new Error("You have to Enter all adminId , password , admincode!!");
    }
    await authService.adminSignUp(adminId, password);
    return res.status(201).json({ message: "Complete" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

//모든 유저 불러오기 기능//

const getAllUser = async (req, res) => {
  const usersList = await authService.getAllUser();
  res.status(200).json(usersList);
};

//대시보드에서 다양한 정보 불러오기

const getDashboard = async (req, res) => {
  const dataList = await authService.getDashboard();
  res.status(200).json(dataList);
};

//관리자가 게시물 작성하기
const adminPosting = async (req, res) => {
  try {
    const { title, content, adminId } = req.body;
    if (!title || !content || !adminId) {
      throw new Error("You have to Enter all adminId , password , admincode!!");
    }
    await authService.adminPosting(title, content, adminId);
    return res.status(201).json({ message: "Complete" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

//아임포트 결제 모듈 테스트
const postPayments = async (req, res) => {
  try {
    const { imp_uid, merchant_uid } = req.body;
    console.log(imp_uid, merchant_uid);
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: Imp_key, // REST API 키
        imp_secret: Imp_secret, // REST API Secret
      },
    });
    const { access_token } = getToken.data.response; // 인증 토큰
    console.log(access_token, "------------------------"); //콘솔 잘찍힘
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
      method: "get", // GET method
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가 Bearer access_token
    });
    console.log(getPaymentData, "-------");
    const paymentData = getPaymentData.data.response; // 조회한 결제 정보

    const findById = await Payments.find;
    ({ merchant_uid: merchant_uid });

    const order = await Orders.findById(paymentData.merchant_uid);
    const amountToBePaid = order.amount;
    const { amount, status } = paymentData;

    if (amount === amountToBePaid) {
      // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
      await findByIdAndUpdate(merchant_uid, { $set: paymentData }); // DB에 결제 정보 저장

      switch (status) {
        case "ready": // 가상계좌 발급
          // DB에 가상계좌 발급 정보 저장
          const { vbank_num, vbank_date, vbank_name } = paymentData;
          await Users.findByIdAndUpdate("/* 고객 id */", {
            $set: { vbank_num, vbank_date, vbank_name },
          });
          // 가상계좌 발급 안내 문자메시지 발송
          SMS.send({
            text: `가상계좌 발급이 성공되었습니다. 계좌 정보 ${vbank_num} ${vbank_date} ${vbank_name}`,
          });
          res.send({ status: "vbankIssued", message: "가상계좌 발급 성공" });
          break;
        case "paid": // 결제 완료
          res.send({ status: "success", message: "일반 결제 성공" });
          break;
      }
    } else {
      // 결제금액 불일치. 위/변조 된 결제
      throw { status: "forgery", message: "위조된 결제시도" };
    }

    if (!imp_uid || !merchant_uid) {
      throw new Error("Can not get  payment Imformation!!");
    }
    await authService.postPayments(imp_uid, merchant_uid);
    return res.status(201).json({ message: "Complete" });
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getUserInforByNickName = async (req, res) => {
  try {
    const { userNickName } = req.query;
    const result = await authService.getUserInforByNickName(userNickName);

    return res.status(200).json(result);
  } catch (err) {
    res.ststua(err.statusCode || 400).json({ message: err.message });
  }
};

const deleteByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await authService.deleteByUserId(userId);
    return res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  adminSignIn,
  adminSignUp,
  getAllUser,
  getDashboard,
  adminPosting,
  postPayments,
  getUserInforByNickName,
  deleteByUserId,
};
