import express from "express";

const app = express();

// URL Logger: 이 미들웨어는 방문 중인 URL을 기록(log) 해야 합니다.
const urlLogger = (req, res, next) => {
  console.log(`Path :  ${req.url}`);
  next();
};

// Time Logger: 이 미들웨어는 요청(request)의 년, 월, 일을 기록해야 합니다.
const timeLogger = (req, res, next) => {
  const date = new Date();
  console.log(
    `Time : ${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
  );
  next();
};

// Security Logger: 이 미들웨어는 프로토콜이 https이면 secure이라고 기록하고,
//  그 외의 경우 insecure라고 기록해야 합니다.
const securityLogger = (req, res, next) => {
  const protocol = req.protocol;
  if (protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure");
  }
  next();
};

// Protector Middleware: 이 미들웨어는
// 사용자가 /protected로 이동하려고 할 경우 이동하지 못하도록 해야 합니다.
const protectorMiddleware = (req, res, next) => {
  if (req.url === "/protected") {
    res.end();
  }
  next();
};

app.use(urlLogger); // url
app.use(timeLogger); // Time: 2021.4.25
app.use(securityLogger); // Insecure
app.use(protectorMiddleware); // /protected로 이동하려고 할 경우 이동하지 못하도록 해야 합니다.
app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(process.env.PORT, () => `Listening!✅`);
