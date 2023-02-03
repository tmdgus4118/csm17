const { google } = require("googleapis");

const mongoose = require("mongoose");
const keys = require("../../sheetKey.json");
const {
  JsonSchema,
  UserSchema,
  testSchema,
  SchoolSchema,
  ExamFileSchema,
} = require("../utils/schema");

const fetch = require("node-fetch");
moment = require("moment");
const Jsons = new mongoose.model("Json", JsonSchema);
const User = new mongoose.model("Users", UserSchema);
const File = new mongoose.model("File", testSchema);
const School = new mongoose.model("School", SchoolSchema);
const Exam = new mongoose.model("Exam", ExamFileSchema);
const { useContainer, TreeRepository, Db } = require("typeorm");
const { json } = require("body-parser");

const getSchoolInfor = async (req, res) => {
  const client = new google.auth.JWT(
    keys.client_email,

    null,

    keys.private_key,

    ["https://www.googleapis.com/auth/spreadsheets"] // 사용자 시트 및 해당 속성에 대한 읽기/쓰기 액세스 허용
  );

  client.authorize(function (err, tokens) {
    if (err) {
      console.log(err);

      return;
    } else {
      gsrun(client);
    }
  });

  async function gsrun(client) {
    const sheets = google.sheets({ version: "v4", auth: client });

    const request = {
      spreadsheetId: "1w8bdXyiv02hetOxk8zPZ62RBxrIHPCjEQVt3k8S84tE",

      range: "학교 정보",

      // , range : "twice"    // 범위를 지정하지 않으면 해당 Sheet의 모든 Shell 값을 가져온다.
    };

    const response = (await sheets.spreadsheets.values.get(request)).data
      .values;
    console.log(typeof response[1][0]);
    console.log(typeof response[1][1]);
    console.log(typeof response[1][2]);
    console.log(typeof response[1][3]);
    console.log(typeof response[1][4]);
    console.log(typeof response[1][5]);
    console.log(response.length);

    const result = [];
    for (let i = 1; i < response.length; i++) {
      try {
        const jsonData = await School.create({
          Number: response[i][0],
          SchoolName: response[i][1],
          SchoolLocation: response[i][2],
          FirstGradeExaminationRanking: response[i][3],
          SecondGradeExaminationRanking: response[i][4],
          ThirdGradeExaminationRanking: response[i][5],
        });
        result.push(jsonData);
      } catch (e) {
        console.log(e);
      }
    }

    return result;
  }

  return res.status(201).json({ message: "Success to Insert Db" });
};

const getFileInfor = async (req, res) => {
  const client = new google.auth.JWT(
    keys.client_email,

    null,

    keys.private_key,

    ["https://www.googleapis.com/auth/spreadsheets"] // 사용자 시트 및 해당 속성에 대한 읽기/쓰기 액세스 허용
  );

  client.authorize(function (err, tokens) {
    if (err) {
      console.log(err);

      return;
    } else {
      gsrun(client);
    }
  });

  async function gsrun(client) {
    const sheets = google.sheets({ version: "v4", auth: client });

    const request = {
      spreadsheetId: "1w8bdXyiv02hetOxk8zPZ62RBxrIHPCjEQVt3k8S84tE",

      range: "파일정보",

      // , range : "twice"    // 범위를 지정하지 않으면 해당 Sheet의 모든 Shell 값을 가져온다.
    };

    const response = (await sheets.spreadsheets.values.get(request)).data
      .values;
    console.log(typeof response[1][0]);
    console.log(typeof response[1][1]);
    console.log(typeof response[1][2]);
    console.log(typeof response[1][3]);
    console.log(typeof response[1][4]);
    console.log(typeof response[1][5]);
    console.log(response.length);

    const result = [];
    for (let i = 1; i < response.length; i++) {
      try {
        const jsonData = await Exam.create({
          Number: response[i][0],
          FileName: response[i][1],
          FileWriter: response[i][2],
          FileCheker: response[i][3],
          Type: response[i][4],
          DownloadLink: response[i][5],
          Created_At: moment().format("YYYY년MM월DD일hh시mm분ss초"),
          Updated_At: moment().format("YYYY년MM월DD일hh시mm분ss초"),
          RequestMessage: response[i][8],
          RequestWriter: response[i][9],
          RequestDate: moment().format("YYYY년MM월DD일hh시mm분ss초"),
        });
        result.push(jsonData);
      } catch (e) {
        console.log(e);
      }
    }

    return result;
  }

  return res.status(201).json({ message: "Success to Insert Db" });
};

module.exports = { getSchoolInfor, getFileInfor };
