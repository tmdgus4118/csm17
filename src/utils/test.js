const fs = require("fs");
const appRoot = require("app-root-path");
fs.readFile(
  `/Users/aaaaaa/Desktop/Back-end/sprint/logs/2023-02-08.txt`,
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  }
);
