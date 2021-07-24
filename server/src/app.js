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
app.use(cors({ origin: "https://60fc7775afc7e680446b9830--xenodochial-clarke-bd4d3f.netlify.app/", credentials: true }));
app.use(express.json());

app.set("trust proxy", 1);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
}))

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", api);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
module.exports = (statusCode, body) => {
  return {  
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 200,
      body: JSON.stringify(body)
    };

  };