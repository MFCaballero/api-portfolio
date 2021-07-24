const morgan = require("morgan");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const api = require("./api");


require("./auth/passport");
require("./auth/passportGoogleSSO");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan("dev"));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api", api);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
