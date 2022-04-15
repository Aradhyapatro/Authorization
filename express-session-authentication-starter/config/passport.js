const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const validPassword = require("../lib/passwordUtils").validPassword;
const User = connection.models.User;

const customFields = {
  username: "aradhya",
  password: "123456",
};

const verifyCallBack = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const hash = user.hash;
      const salt = user.salt;

      const isValid = validPassword(password, hash, salt);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const Strategy = new LocalStrategy(customFields, verifyCallBack);

passport.use(Strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userid, done) => {
  User.findById(userid)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
