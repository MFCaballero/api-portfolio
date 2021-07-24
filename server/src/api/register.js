const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require('../db');

const router = express.Router();

router.post('/register', async (req, res, next) => {

  function isEmail(n) {
    if(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(n)){
        return true
    }
    return false
  }
  const { fullName, email, password } =  req && req.body;
  if (!fullName || !email || !password || typeof fullName !== "string" || typeof email !=="string"  || typeof password !== "string" || password.length < 6 || !isEmail(email)) {
    res.send("Improper Values");
    return;
  }
  try {
    const user = await User.findOne({ where: {email} })
    if (user) res.send("User Already Exists");
    if(!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        fullName,
        email,
        password: hashedPassword,
      })
      res.send("success");
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
