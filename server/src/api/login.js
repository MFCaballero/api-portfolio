const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists").status(400);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated").status(200);
        
      });
    }
  })(req, res, next);
});

module.exports = router;
