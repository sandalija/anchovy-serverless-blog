const axios = require("axios");

const allTimes = [];
const initTime = new Date().getDate();

const postTest = (url, token = "") => {
  const startTime = new Date().getTime();
  axios
    .post(
      `${url}/posts`,
      {
        title: "Mi post",
        body: "test",
      },
      {
        headers: {
          Authorization: token || "",
        },
      }
    )
    .then((response) => {
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
    " ------------------------ \n Test POST \n -------------------------"
  );
  console.log("Elapsed\tAverage (ms)");
  for (let i = 0; i < steps; i++) {
    postTest(
      "https://fty1rmghx1.execute-api.eu-west-1.amazonaws.com/dev",
      "eyJraWQiOiJOV1RxT25mVG12TmpNWDJPOHFUMlwvTTFLTTUxSFJnTDRUMEtXV0dTSUJhVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3MWYxN2UyOS1jOWEwLTQ2MWItODU1NS02MzJlNTgzOWZlMDMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96eVJEN29zem4iLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0MjlrcXJjMG1rbHFmMG43NGFlMmNjN3ZuZSIsImV2ZW50X2lkIjoiYzA0NDI4ZmItYTBlNy00NzE5LTg2MzAtMmVkMjYyZDEzNDdmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2MzA1Mzc5NzgsImV4cCI6MTYzMDU0MTU3OCwiaWF0IjoxNjMwNTM3OTc4LCJqdGkiOiIwYzQ2NDliNy00Yjg5LTQ5ZmItODk0Mi1mYjJlYWMzOWNlM2UiLCJ1c2VybmFtZSI6IjcxZjE3ZTI5LWM5YTAtNDYxYi04NTU1LTYzMmU1ODM5ZmUwMyJ9.oLP7iT2Y5d1PpcBNvgj6-aF1WpZ5T3mZZjctNn1SAysNqDluw7P_9-3vBHHq6q0CzGLEXFUu_2fB6Zb1S8H1Q5Ji4HeQDB9Fv8ThG2PqB3B3r3sxPXQZWBXaZSfzZdxnRupMCwo-ACgpS6AsDJ-bLl6lUvKpdRqdNnNO9e40VMb-m85fPdKIw4XUz7hUcHpgHZsw37WJoN3etk2xurzUkrBfWAzOm3Ax1R4d-DzYO0Y0aGmgj9UKjTTbP7ul3l5Ux2bc9bylJoxUu6zpDEyx2JOgzqFMMY24_pFkg5QoY1KEM10z9Wf6qRHNlbaub-Lo2x_WrW9773Zvk8rq2HPIuQ"
    );
  }
};

var args = process.argv.slice(2);
runTest(parseInt(args[0]));
