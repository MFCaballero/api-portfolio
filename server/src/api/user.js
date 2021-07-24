const express = require("express");

const router = express.Router();

router.get("/auth/user", (req, res) => {
  console.log(req.user)
  res.json(req.user);
});

module.exports = router;
