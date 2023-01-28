// use the local passport strategy that user makes a new password and username
const LocalStrategy = require('passport-local').Strategy;
// use mongoose because 98% of humans have allergies to mongodb native but also dont even use it
const mongoose = require('mongoose');
// take users from the database and have access to their methods
const User = require('../models/User');

//export 
module.exports = function (passport) {
  // testing inputs against stored information 
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // find an email matching in the database to what was in the form
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      // if there is an error, run the error and cancel the interaction 
      if (err) { return done(err); }
      // if the email doesn't match any in the user collection cancel login and alert the email is not found 
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      // if user has an email but no linked password, cancel login and alert how to set up local password
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
      }
      // check if password is correct
      user.comparePassword(password, (err, isMatch) => {
        // if there is an error, run the error and cancel the interaction 
        if (err) { return done(err); }
        // if password is a match to the hashed password 
        if (isMatch) {
          // if password is also correct log em in
          return done(null, user);
        }
        // if password is wrong for that email return invalid email or password
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  }));
  
  // convert object's state to a byte stream so it can be reverted back into a copy of the object
  // decides what user information will be stored in the cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // convert byte stream state into an object
  passport.deserializeUser((id, done) => {
    // searches mongoDB for user matching the ID in the cookie
    User.findById(id, (err, user) => done(err, user));
  });
};
