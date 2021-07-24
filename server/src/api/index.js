const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");
const logoutApi = require("./logout");
const addRatingApi = require("./addRating");
const getRatingsApi = require("./getRatings");
const deleteRatingApi = require("./deleteRating");
const updateRatingApi = require("./updateRating");
const userRatingApi = require("./userRating");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(loginWithGoogleApi);
router.use(userApi);
router.use(logoutApi);
router.use(addRatingApi);
router.use(getRatingsApi);
router.use(deleteRatingApi);
router.use(updateRatingApi);
router.use(userRatingApi);

module.exports = router;
