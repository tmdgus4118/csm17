const { google } = require("googleapis");
const mongoose = require("mongoose");
const keys = require("../../sheetKey.json");
const { JsonSchema, UserSchema } = require("../utils/schema");

const fetch = require("node-fetch");
moment = require("moment");
const Jsons = new mongoose.model("Json", JsonSchema);
const User = new mongoose.model("Users", UserSchema);
const { useContainer, TreeRepository, Db } = require("typeorm");
const { json } = require("body-parser");

const all = async () => {
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
      spreadsheetId: "1Q91DUw5Pm9qZEs-UUqhe2q5NKyPtcVUcKwW8KWCzrtI",

      range: "시트1",

      // , range : "twice"    // 범위를 지정하지 않으면 해당 Sheet의 모든 Shell 값을 가져온다.
    };

    const response = (await sheets.spreadsheets.values.get(request)).data
      .values;
    console.log(typeof response[1][0]);
    console.log(typeof response[1][1]);
    console.log(typeof response[1][2]);
    console.log(typeof response[1][3]);
    console.log(typeof response[1][4]);
    console.log(response);

    const result = [];
    for (let i = 1; i < response.length; i++) {
      try {
        const jsonData = await Jsons.create({
          Num: response[i][0],
          name: response[i][1],
          start: response[i][2],
          desc: response[i][3],
          url: response[i][4],
        });
        result.push(jsonData);
      } catch (e) {
        console.log(e);
      }
    }

    return result;
  }
};

module.exports = all;
