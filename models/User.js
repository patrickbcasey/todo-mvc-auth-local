// imports bcrypt for crypto stuff
const bcrypt = require('bcrypt');
// imports mongoose mongodb ODM
const mongoose = require('mongoose');

// creates user schema for uniformly formatting data to be used in database
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});


// Password hash middleware.

// pre-hook middleware functions to be executed before mongoose queries
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  // salts password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    // hashes password
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
