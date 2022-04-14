const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

// mongoose connection
const dbString = "mongodb://localhost:27017/Auth_DB";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongoUrl: "mongodb://localhost:27017/Auth_DB",
  ttl: 24 * 60 * 60, // = 1 days. Default
});

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.viewCount) {
    req.session.viewCount = req.session.viewCount + 1;
  } else {
    req.session.viewCount = 1;
  }

  res.send(
    `<h1>You have visited this page ${req.session.viewCount} times.</h1>`
  );
});

app.listen(3000);
