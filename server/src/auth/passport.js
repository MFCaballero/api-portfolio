const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const { User } = require('../db');
const passport = require("passport");

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async function(email, password, done) {
  var user = await User.findOne(
    { where: {
        email: email
      }
    });
  if (!user) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) throw err;
    if (result === true) {
      return done(null, user);
    } else {
      return done(null, false , { message: 'Incorrect password.', email,password });
    }
  });
}));


/* passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) cb(null, user);
}); */



