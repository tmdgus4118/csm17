const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");
const ejs = require("ejs");
const crypto = require("crypto");
process.env.AWS_ACCESS_KEY_ID = "EXAMPLEIDKEY"; // aws access key
process.env.AWS_SECRET_ACCESS_KEY = "EXAMPLEACCESSKEYPASSWORD"; // aws secret access key
router.post("/mail", (req, res, next) => {
  //Request body에 실어져 있는 데이터 가져오기
  const userEmail = req.params.userEmail;

  //해시코드 생성
  const code = crypto.randomBytes(3).toString("hex");
  //DB에 해당 유저 튜플에 코드 값 UPDATE 코드 .. 생략

  //발송 할 ejs 준비
  let emailTemplate;
  ejs.renderFile(
    "./registerVerify.ejs", //ejs파일 위치
    { email: userEmail, code: code },
    (err, data) => {
      //ejs mapping
      if (err) {
        console.log(err);
      }
      emailTemplate = data;
    }
  );
  //ses ready
  const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1", //AWS SES Region 수정
  });
  // create Nodemailer SES transporter
  // 이 때 process.env에 AWS_ACCESS_KEY_ID와 AWS_SECRET_ACCESS_KEY를 확인한다.
  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });
  // send mail
  transporter.sendMail(
    {
      from: "닉네임<welcome@example.com>",
      to: target,
      subject: "[example] 회원가입 인증메일 입니다.",
      html: emailTemplate,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  );
  res.status(200).json({
    code: 200,
    message: "발송 성공",
  });
});
