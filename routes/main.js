//module imports
// require importing express to be used in the program
const express = require('express');
//creates a router object that handles the routes
const router = express.Router();
//importing a controller folder to authController to use its methods
const authController = require('../controllers/auth');
//importing a controller folder to homeController to use its methods
const homeController = require('../controllers/home');
//imports authentication middleware, allows guests and logged in users
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//GET response for the home route, redirects to home controller, renders home page
router.get('/', homeController.getIndex);
//GET response for login route, redirects to auth controller, checks if you are logged in already
router.get('/login', authController.getLogin);
//POST response for login route, redirects to auth controller, logs in user after validation and authentication
router.post('/login', authController.postLogin);
//GET response for logout route, redirects to auth controller, logs user out and redirects to home route
router.get('/logout', authController.logout);
//GET response for signup route, redirects to auth controller, redirects to ankis if signed in, otherwise takes you to the signup page
router.get('/signup', authController.getSignup);
//POST response for signup route, redirects to auth controller, takes data from the entry form and uses it to create a new user account after validation and authentication, takes you to anki page after
router.post('/signup', authController.postSignup);

//exports router object to be used in other places
module.exports = router;