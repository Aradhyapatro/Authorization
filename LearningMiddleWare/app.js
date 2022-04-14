import express from "express";
const app = express();

const middleware1 = (req, res, next) => {
  console.log("I am middleware1");
  req.customDemandLevel = 2;
  next();
};

const middleware2 = (req, res, next) => {
  console.log("I am middleware2 " + (req.customDemandLevel + 1));
  next();
};

const errHandler = (err, req, res, next) => {
  console.log(err);
  res.send("<h2>There is some Error</h2>");
  next();
};

app.use(middleware1);
app.use(middleware2);

const response = (req, res) => {
  console.log("response");
  res.send("<h1>I am Arya</h1>");
};

app.get("/", response);
app.get(
  "/hello",
  (req, res, next) => {
    console.log("Hello arya");
    next();
  },
  (req, res) => {
    res.send("<h2>Hello Aradhya!!!</h2>");
  }
);
app.get("/hello1", (req, res, next) => {
  const err = new Error("i am an Error Aradhya\n");
  next();
  next(err);
});

app.use(errHandler);

app.listen(3000);
