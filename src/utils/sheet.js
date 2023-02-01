const { google } = require("googleapis");
const mongoose = require("mongoose");
const keys = require("../../sheetKey.json");
const JsonSchema = require("../utils/schema");
const Json = new mongoose.model("Json", JsonSchema);
const fetch = require("node-fetch");

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

const gsrun = async (client) => {
  const sheets = google.sheets({ version: "v4", auth: client });

  const request = {
    spreadsheetId: "1Q91DUw5Pm9qZEs-UUqhe2q5NKyPtcVUcKwW8KWCzrtI",

    range: "시트1",

    // , range : "twice"    // 범위를 지정하지 않으면 해당 Sheet의 모든 Shell 값을 가져온다.
  };

  const response = (await sheets.spreadsheets.values.get(request)).data.values;
  console.log(response[1][2]);
  //   Json.create({ desc: response[0] });

  for (i = 1; i <= response.values.length; i++) {
    //   console.log(response.values[i]);
    const jsonDatas = await Json.create({
      name: response[i][0],
      start: response[i][1],
      desc: response[i][2],
      url: response[i][3],
    });
    return jsonDatas;
  }
};

//   const parsingJson = async () => {
//     for (i = 0; i <= response.length; i++) {
//       const splitData = response.split()[i];
//       return splitData;
//     }
//   };
//   console.log(parsingJson);

module.exports = gsrun;
