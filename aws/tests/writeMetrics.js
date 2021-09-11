const axios = require("axios");

const allTimes = [];
const initTime = new Date().getTime();

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
          `\t${endTime - initTime}`
        );
      } else console.log("Failed request");
    });
};

const runTest = async (steps) => {
  console.log(
    "------------------------\n Test POST \n-------------------------\n",
    "\n * Elapsed: time needed to resolve the request",
    "\n * Average: average time to resolve requests",
    "\n * Resolved at: time in milliseconds since the script started\n"
  );
  console.log("Elapsed\tAverage\tResolved at");
  for (let i = 0; i < steps; i++) {
    postTest(
      "https://fty1rmghx1.execute-api.eu-west-1.amazonaws.com/dev",
      "eyJraWQiOiJOV1RxT25mVG12TmpNWDJPOHFUMlwvTTFLTTUxSFJnTDRUMEtXV0dTSUJhVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3MWYxN2UyOS1jOWEwLTQ2MWItODU1NS02MzJlNTgzOWZlMDMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96eVJEN29zem4iLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0MjlrcXJjMG1rbHFmMG43NGFlMmNjN3ZuZSIsImV2ZW50X2lkIjoiYzQ4Zjk0MTMtNjJmZi00ZDg0LWE5NWMtZmNjYWE1OTY3MzAwIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2MzEzNzg2MDUsImV4cCI6MTYzMTM4MjIwNSwiaWF0IjoxNjMxMzc4NjA1LCJqdGkiOiIyNmJlYTJmNC1mMzk3LTQ0NzItYTkxNi1mYWFjYzJiYzliOWIiLCJ1c2VybmFtZSI6IjcxZjE3ZTI5LWM5YTAtNDYxYi04NTU1LTYzMmU1ODM5ZmUwMyJ9.bAOsu_o4Q0HDvk_jauTp6rpppD8WAIWYtY8ZFJxgKYEnjpGT4Rzunse4iFlxJNc1jubWhbzL9iy5QKdLMvtCHVKZ0F67bxqMSMjnKzRaSh1uLiFgWjPNSoo_8eeaPCq_L1vw-VYod9tvUaRLuO-gHm-atoiswZUpTJyXSTtnEwjU3Vr15yqKav6P7vqLr_Fzvh5oD3d9AHvUVB9rgXDNEs8URVlsvQ4qMhHW4pDT1kaHmHyTxTrPTO-hCts9jE9CrqpXVq-R_q_nYgQgoCP5vYr42IqqKnAOUNcuvZt6uTBxSMi2yFYh9-n-qUE5T13iNH35NYoSL9BfVw7MyRrbpA"
    );
  }
};

var args = process.argv.slice(2);
runTest(parseInt(args[0]));
