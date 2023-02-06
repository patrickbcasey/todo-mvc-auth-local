//requires importing mongoose to be used in the program
const mongoose = require('mongoose');
//creates a new schema to format the data that is retrieved from the database and passed onto the rest of the program
const AnkiSchema = new mongoose.Schema({
  //data entries consist of a name, completion status and unique ID
  anki: {
    type: String,
    required: true,
  },
  ankiAnswer: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  },
  timesAnswered: {
    type: Number,
    required: true
  },
  lastSession: {
    type: Date,
    required: true
  }
});


//exports the collection from the database along with the schema
module.exports = mongoose.model('Anki', AnkiSchema);
