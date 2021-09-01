const axios = require("axios");

const allTimes = [];
const initTime = new Date().getTime();

const getTest = (url, token = "") => {
  const startTime = new Date().getTime();
  axios.get(`${url}/posts`).then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;
      allTimes.push(elapsedTime);
      console.log(
        elapsedTime,
        "\t",
        allTimes.reduce((x, y) => x + y) / allTimes.length,
        `(@ ${endTime - initTime})`
      );
    } else console.log("Failed request");
  });
};

const runTest = async (steps) => {
  console.log(
    " ------------------------ \n Test GET \n -------------------------"
  );
  console.log("Elapsed\tAverage (ms)");
  for (let i = 0; i < steps; i++) {
    getTest("https://fty1rmghx1.execute-api.eu-west-1.amazonaws.com/dev");
  }
};

var args = process.argv.slice(2);
runTest(parseInt(args[0]));
