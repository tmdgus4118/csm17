const { google } = require("googleapis");
const mongoose = require("mongoose");
const keys = require("../../sheetKey.json");
const { JsonSchema, UserSchema, testSchema } = require("../utils/schema");

const fetch = require("node-fetch");
moment = require("moment");
const Jsons = new mongoose.model("Json", JsonSchema);
const User = new mongoose.model("Users", UserSchema);
const File = new mongoose.model("File", testSchema);
const { useContainer, TreeRepository, Db } = require("typeorm");
const { json } = require("body-parser");

const all2 = async (req, res) => {
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
      spreadsheetId: "1U96efSPRuGskzjXYL66A8XouXgKEi1qkQoHmSH7zYNE",

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

    const result = [];
    for (let i = 4; i <= response.length; i++) {
      try {
        const jsonData = await File.create({
          Number1: response[i][0],
          OrderData: response[i][1],
          PayCard: response[i][2],
          SaleSite: response[i][3],
          MarketOrderNumber: response[i][4],
          ProductName: response[i][5],
          Option: response[i][6],
          Quantity: response[i][7],
          BuyerName: response[i][8],
          PassNumber: response[i][9],
          BuyerNumber: response[i][10],
          Price: response[i][11],
          DelieveryPrice: response[i][12],
          TotalPrice: response[i][13],
          CountryBuyPrice: response[i][14],
          RealPrice: response[i][15],
          Dollar: response[i][16],
          Count: response[i][17],
          Delivery: response[i][18],
          DeliveryMethod: response[i][19],
          RealWeight: response[i][20],
          OpenMarketPee: response[i][21],
          OpenMarketMoney: response[i][22],
          PassMoney: response[i][23],
          VolunterrMoney: response[i][24],
          UsedMoneySum: response[i][25],
          WorkingMoney: response[i][26],
          GetMoney: response[i][27],
          OpenMarketGetMoney: response[i][28],
          Percentage: response[i][29],
          Special: response[i][30],
          Number: response[i][31],
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

module.exports = all2;
