const mongoose = require("mongoose");
const { logger } = require("../../config/winston");
const LogSchema = require("../utils/schema");
const Logs = new mongoose.model("Logs", LogSchema);

const getSearchLog = async (req, res) => {
  const { logger } = require("../../config/winston");
  logger.info(`Admin Search Logs`);

  try {
    const fs = require("fs");

    fs.readFile(
      "/Users/aaaaaa/Desktop/Back-end/sprint/logs/Combined.txt",
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Failed to read the log file." });
        }

        const result = {};

        try {
          result["원하는 검색어"] = data
            .match(/원하는 검색어/g)
            .filter(function (item) {
              return item !== "";
            }).length;
        } catch (err) {
          result["원하는 검색어"] = 0;
        }

        try {
          result["미분"] = data.match(/미분/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["미분"] = 0;
        }

        try {
          result["적분"] = data.match(/적분/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["적분"] = 0;
        }

        try {
          result["통계"] = data.match(/통계/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["통계"] = 0;
        }

        try {
          result["2차"] = data.match(/2차/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["2차"] = 0;
        }

        try {
          result["3차"] = data.match(/3차/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["3차"] = 0;
        }

        try {
          result["확률"] = data.match(/확률/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["확률"] = 0;
        }

        try {
          result["전체 검색수"] = data.match(/Search/g).filter(function (item) {
            return item !== "";
          }).length;
        } catch (err) {
          result["전체 검색수"] = 0;
        }
        const wordCount = {};
        const words = data.split(/\W+/);

        words.forEach((word) => {
          word = word.toLowerCase();
          if (!wordCount[word]) {
            wordCount[word] = 0;
          }
          wordCount[word]++;
        });

        const sortedWords = Object.entries(wordCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const result2 = sortedWords.map((word, index) => {
          return `${index + 1}. ${word[0]} (${word[1]} times)`;
        });

        const wordCount4 = {};
        const logs = data.split("\n");

        logs.forEach((log) => {
          const words4 = log.match(/"([^"]*)"/g);
          if (!words4) {
            return;
          }
          words4.forEach((word4) => {
            word4 = word4.slice(1, -1);
            if (!wordCount4[word4]) {
              wordCount4[word4] = 0;
            }
            wordCount4[word4]++;
          });
        });

        const sortedWords4 = Object.entries(wordCount4)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const result21 = sortedWords4.map((word4, index) => {
          return `${index + 1}. ${word4[0]} (${word4[1]} times)`;
        });

        return res.status(200).json({
          "문제타입별 조휘수": result,
          가장많이검색된단어상위5: result2,
          가장많이검색된문제타입상위5: result21,
        });
      }
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while processing the request." });
  }
};

const userIpLog = async (req, res) => {
  const { logger } = require("../../config/winston");
  const ipAddress = req.params.ipadress;
  logger.info(`Admin Search ${ipAddress} Logs`);
  try {
    const fs = require("fs");
    fs.readFile(
      "/Users/aaaaaa/Desktop/Back-end/sprint/logs/2023-02-07 .txt",
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Failed to read the log file." });
        }
        const result = {};
        try {
          result["조회한 IP의 Log"] = data
            .match(new RegExp(ipAddress, "g"))
            .filter(function (item) {
              return item !== "";
            }).length;
        } catch (err) {
          result["조회한 IP의 Log"] = 0;
        }
        return res.status(200).json({
          result: result,
        });
      }
    );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while processing the request." });
  }
};

const postTxtFile = async (req, res) => {
  const fs = require("fs").promises;

  const standardFilePath =
    "/Users/aaaaaa/Desktop/Back-end/sprint/logs/standard.txt";
  const newlyCreatedFilePath = "/logs/";

  try {
    const newlyCreatedFileContents = await fs.readFile(
      newlyCreatedFilePath,
      "utf8"
    );

    await fs.appendFile(standardFilePath, newlyCreatedFileContents, "utf8");

    res
      .status(200)
      .json({ message: "Contents successfully copied to standard file." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to copy contents to standard file." });
  }
};

const combineTxtFiles = async (req, res) => {
  const { logger } = require("../../config/winston");
  logger.info(`Admin Combined TXT Log Files!`);
  const fs = require("fs").promises;
  const folderPath = "/Users/aaaaaa/Desktop/Back-end/sprint/logs";
  const combinedFilePath =
    "/Users/aaaaaa/Desktop/Back-end/sprint/logs/Combined.txt";

  try {
    let combinedFileContents = new Set();

    const files = await fs.readdir(folderPath);

    for (const file of files) {
      if (file.endsWith(".txt")) {
        const filePath = `${folderPath}/${file}`;
        const fileContents = await fs.readFile(filePath, "utf8");
        fileContents
          .split("\n")
          .forEach((line) => combinedFileContents.add(line));
      }
    }

    await fs.writeFile(
      combinedFilePath,
      [...combinedFileContents].join("\n"),
      "utf8"
    );

    res.status(200).json({ message: "Files successfully combined." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to combine files." });
  }
};

const convertTxtFileToJson = async (req, res) => {
  const fs = require("fs");
  fs.readFile(
    "/Users/aaaaaa/Desktop/Back-end/sprint/logs/Combined.txt",
    "utf-8",
    (err, data) => {
      if (err) {
        return res.status(500).send("Error reading text file");
      }

      const lines = data.split("\n");

      const keys = lines[0].split(",");

      const objects = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const object = {};
        for (let j = 0; j < keys.length; j++) {
          object[keys[j]] = values[j];
        }
        objects.push(object);
      }

      fs.writeFile(
        "/Users/aaaaaa/Desktop/Back-end/sprint/logs/convertCombined.json",
        JSON.stringify(objects),
        (err) => {
          if (err) {
            return res.status(500).send("Error writing JSON file");
          }

          res.send("Text file converted to JSON successfully");
        }
      );
    }
  );
};

const countTimeData = async (req, res) => {
  const { logger } = require("../../config/winston");
  logger.info(`Admin Count Time Data Log`);
  const fs = require("fs");
  fs.readFile(
    "/Users/aaaaaa/Desktop/Back-end/sprint/logs/Combined.txt",
    "utf-8",
    (err, data) => {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }

      const lines = data.split("\n");
      const countsPerDay = {};
      const countsPerHour = new Array(24).fill(0);

      lines.forEach((line) => {
        if (!line) return;
        const splitLine = line.split(" ");
        if (splitLine.length < 2) return;

        const date = splitLine[0];
        const day = date.split(" ")[0];
        if (!countsPerDay[day]) {
          countsPerDay[day] = 1;
        } else {
          countsPerDay[day]++;
        }

        const hour = parseInt(splitLine[1].split(":")[0], 10);
        countsPerHour[hour]++;
      });

      const countsPerHourStr = countsPerHour
        .reduce((acc, count, index) => {
          return acc.concat(`${index}:00~${index + 1}:00  : ${count} Datas, `);
        }, "")
        .slice(0, -2);

      const countsPerDayStr = Object.keys(countsPerDay)
        .reduce((acc, day) => {
          return acc.concat(`${day}: ${countsPerDay[day]} Datas, `);
        }, "")
        .slice(0, -2);
      const topFivePerHour = countsPerHour
        .map((count, index) => {
          return { hour: index, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const topFivePerHourStr = topFivePerHour
        .reduce((acc, { hour, count }) => {
          return acc.concat(`${hour}:00~${hour + 1}:00  : ${count} Datas, `);
        }, "")
        .slice(0, -2);

      res.json({
        "시간별 트래픽 수": countsPerHourStr,
        "날짜별 트래픽 수": countsPerDayStr,
        "가장 트래픽이많은시간": topFivePerHourStr,
      });
    }
  );
};

const countTopFive = async (req, res) => {
  const fs = require("fs");
  fs.readFile(
    "/Users/aaaaaa/Desktop/Back-end/sprint/logs/Combined.txt",
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
        return;
      }

      const lines = data.split("\n");
      const counts = {};

      lines.forEach((line) => {
        const startIndex = line.indexOf("RequestIp:") + 10;
        const endIndex = line.indexOf(",");
        const ip = line.substring(startIndex, endIndex);
        if (!counts[ip]) {
          counts[ip] = 1;
        } else {
          counts[ip]++;
        }
      });

      const sortedCounts = Object.keys(counts)
        .sort((a, b) => counts[b] - counts[a])
        .slice(0, 5);

      const topFiveWithCounts = sortedCounts.map((ip) => ({
        ip,
        count: counts[ip],
      }));

      res.json({
        "가장 많은 접속 IP": topFiveWithCounts,
        "상위5IP 총 접속수 ": lines.length,
      });
    }
  );
};

module.exports = {
  getSearchLog,
  userIpLog,
  postTxtFile,
  combineTxtFiles,
  convertTxtFileToJson,
  countTimeData,
  countTopFive,
};
