//module imports
// require importing express to be used in the program
const express = require('express');
//creates a router object that handles the routes
const router = express.Router();
//importing a controller folder to ankisController to use its methods
const ankisController = require('../controllers/ankis');
//imports authentication middleware, allows users only
const { ensureAuth } = require('../middleware/auth');

//GET response for the home route of ankis, redirects to ankis controller, finds and displays anki and completed items for the user
router.get('/', ensureAuth, ankisController.getAnkis);
//POST response for the createAnki route, redirects to ankis controller, creates a new anki item for the user and takes you back to the ankis home route
router.post('/createAnki', ankisController.createAnki);
//DELETE response for the deleteAnki route, redirects to ankis controller, removes an item from the database for the user
router.delete('/deleteAnki', ankisController.deleteAnki);
//updates anki to being solved
router.put('/solvedAnki', ankisController.solvedAnki);
//exports router object to be used in other places
module.exports = router;