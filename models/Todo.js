//requires importing mongoose to be used in the program
const mongoose = require('mongoose');
//creates a new schema to format the data that is retrieved from the database and passed onto the rest of the program
const TodoSchema = new mongoose.Schema({
  //data entries consist of a name, completion status and unique ID
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
});

//exports the collection from the database along with the schema
module.exports = mongoose.model('Todo', TodoSchema);
