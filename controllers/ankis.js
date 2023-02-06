//require importing the data schema
const Anki = require('../models/Anki');
//exports the response methods to be used in other places
module.exports = {
  //GET response to find and display anki items
  getAnkis: async (req, res) => {
    //logs the user that is requesting the data in the console
    console.log(req.user);
    try {
      //find items in the database that are tied to the user
      const ankiItems = await Anki.find({ userId: req.user.id });
      //find uncompleted items in the database that are tied to the user
      const itemsLeft = await Anki.countDocuments({ userId: req.user.id, completed: false });
      //render the anki.ejs page and pass data into it to be used
      res.render('ankis.ejs', { ankis: ankiItems, left: itemsLeft, user: req.user });
    } catch (err) {
      //catches and logs any errors in the console
      console.log(err);
    }
  },
  //POST response to create a new item
  createAnki: async (req, res) => {
    try {
      //creates a new uncompleted item in the database that is tied to the user with input data from the entry form
      await Anki.create({ anki: req.body.ankiItem, ankiAnswer: req.body.ankiAnswer, userId: req.user.id, timeStamp: Date.now(), timesAnswered: 0, lastSession: 0 });
      //logs a confirmation message in the console and redirects the user to the anki home route
      console.log('Anki has been added!');
      // refreshes the page
      res.redirect('/ankis');
    } catch (err) {
      //catches and logs any errors in the console
      console.log(err);
    }
  },

  // defines the deleteanki function
  deleteAnki: async (req, res) => {
    // logs the id of the anki that the request would like to delete
    console.log(req.body.ankiIdFromJSFile);
    try {
      // finds a anki with the same id as in the request body and deletes it
      await Anki.findOneAndDelete({ _id: req.body.ankiIdFromJSFile });
      // logs deleted anki
      console.log('Deleted Anki');
      // responds with "Deleted it" as json
      res.json('Deleted It');
    } catch (err) {
      // logs the error
      console.log(err);
    }
  },
  solvedAnki: async (req, res) => {
    try {
      //updates an item as complete from incomplete according to input from another file
      await Anki.findOneAndUpdate({ _id: req.body.ankiIdFromJSFile }, {
        // sets completed property to true
        lastSession: Date.now(),
        $inc: { timesAnswered: 1 }
      });
      // logs "Anki Solved"
      console.log('Anki Solved');
      // response with "anki solved" as json
      res.json('Anki Solved');
    } catch (err) {
      // logs the error
      console.log(err);
    }
  },
};