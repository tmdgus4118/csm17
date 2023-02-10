const getSearchLog = async (searchLog) => {
  const fs = require("fs");

  fs.readFile(
    "/Users/aaaaaa/Desktop/Back-end/sprint/logs/2023-02-08.txt",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      try {
        const count = data.match(/`${searchLog}`/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log(`${searchLog}:검색 횟수`, count);
      } catch (err) {
        console.log(`${searchLog}:검색 횟수:0`);
      }

      try {
        const count = data.match(/미분/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log("미분 검색횟수:", count);
      } catch (err) {
        console.log("미분 검색횟수:0");
      }
      try {
        const count1 = data.match(/적분/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log("적분 검색횟수:", count1);
      } catch (err) {
        console.log("적분 검색횟수:0");
      }
      try {
        const count2 = data.match(/통계/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log("통계 검색횟수:", count2);
      } catch (err) {
        console.log("통계 검색횟수:0");
      }
      try {
        const count3 = data.match(/2차/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log("2차방정식 검색횟수:", count3);
      } catch (err) {
        console.log("2차방정식 검색횟수:0");
      }
      try {
        const count4 = data.match(/3차/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log("3차방정식 검색횟수:", count4);
      } catch (err) {
        console.log("3차방정식 검색횟수:0");
      }
      try {
        const count5 = data.match(/확률/g).filter(function (item) {
          return item !== "";
        }).length;
        console.log("확률 검색횟수:", count5);
      } catch (err) {
        console.log("확률 검색횟수:0");
      }
    }
  );
};

module.exports = getSearchLog;
