// require importing passport, validator, User to be used in the program
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
//GET response to check to see if user is already logged in and if so will redirect to '/todos'
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/todos');
  }
  // if user is not logged in they will be shown the login page
  res.render('login', {
    title: 'Login'
  });
};
//POST response to log in user after validation and authentication
exports.postLogin = (req, res, next) => {
  // initializes validationErrors array
  const validationErrors = [];
  //checks to see if email address follows the correct syntax and pushes an error message if not
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  //checks to see if the password form is filled in
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
  //checks to see if there are any validation errors in the login info
  if (validationErrors.length) {
    // flashes error on screen
    req.flash('errors', validationErrors);
    // redirects to login page
    return res.redirect('/login');
  }
  //normalizes the email address
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  // uses passport.authenticate to check if the typed in user and password match any in the database
  // if there is no match an error message will be flashed and user will be redirected to login page
  // if there is a match flash a confirmation message and redirect to '/todos' page
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      // flashes success on screen
      req.flash('success', { msg: 'Success! You are logged in.' });
      // redirects to where the user left off in their session, or /todos if no session return info exists
      res.redirect(req.session.returnTo || '/todos');
    });
  })(req, res, next);
};
//defines the logout function and attempts to destroy current session 
// if successful log confirmation message 
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.');
  });
  // destroys session information
  req.session.destroy((err) => {
    // logs error
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    // sets current user to null
    req.user = null;
    // redirects to /
    res.redirect('/');
  });
};
//checks if the user is logged in and if so redirects them to '/todos'
//if user is not logged in they will be be redirected to sign up page
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/todos');
  }
  res.render('signup', {
    title: 'Create Account'
  });
};
//POST response to sign in user after validation and authentication
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  //checks to see if email address follows the correct syntax and pushes an error message if not
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  //checks to see if chosen password is at least 8 characters and if not pushes message alerting user
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });
  //checks to see if both passwords match and if not pushes error message
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });
  //checks to see if there are any validation errors in the user info and flashes message if so 
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('../signup');
  }
  //normalizes email
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  //function to create new user
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });
  //checks to see if username or email is already in use and flashes message if it is
  User.findOne({
    $or: [
      { email: req.body.email },
      { userName: req.body.userName }
    ]
  }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address or username already exists.' });
      return res.redirect('../signup');
    }
    //saves new user to database and logs in user, redirecting them to '/todos'

    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/todos');
      });
    });
  });
};