// const googleSpreadsheet = require("google-spreadsheet");

// const creds = require("../../sheetKey.json");

// const addSchoolInfor =async(req,res) => {
// const doc = new googleSpreadsheet({
//   spreadsheetId: "1Q91DUw5Pm9qZEs-UUqhe2q5NKyPtcVUcKwW8KWCzrtI",

//   range: "학교 정보",

//   // , range : "twice"    // 범위를 지정하지 않으면 해당 Sheet의 모든 Shell 값을 가져온다.
// });

// doc.useServiceAccountAuth(creds, function (err) {
//   let rowData = {  : "크루즈", 제조사: "쉐보레" };

//   doc.addRow(
//     1, // 첫번째 시트

//     rowData, // 입력할 데이터

//     function (err) {
//       // 콜백 데이터

//       console.log(err);
//     }
//   );
// })}
