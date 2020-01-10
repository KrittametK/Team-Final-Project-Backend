const env = process.env.NODE_ENV || 'development'
const config = require('../config.json')[env];

const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = config.salt_length;
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const db = require("../../models");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let jwtOptions = {};
jwtOptions.secretOrKey = "c0d3c4mp4";

passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      (email, password, done) => {
        db.user
          .findOne({
            where: { email: email }
          })
          .then(user => {
            // done(error, user, info)
            if (user !== null) {
              console.log("email already taken");
              return done(null, false, { message: "email already taken" });
            } else {
              let salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
              let hashedPassword = bcrypt.hashSync(password, salt);
              db.user.create({ 
                  email,
                  password: hashedPassword })
                .then(user => {
                  console.log("user created");
                  
                  
                  return done(null, user);
                })
                .catch(err => {
                  console.error(err);
                  done(err);
                });
            }
          });
      }
    )
  );