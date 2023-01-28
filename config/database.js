// because mongodb interaction has been known to cause cancer we handle mongodb with mongoose. import mongoose from node modules
const mongoose = require('mongoose');

//async contact the database handler, when in contact we connect to our database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      // forces DB_STRING to use newer version
      useNewUrlParser: true,
      // use one data handling topology to run failiures faster
      useUnifiedTopology: true,
      // prevent default use of deprecated Find One and Modify instead of Find One and Update
      useFindAndModify: false,
      // use createIndex instead of ensureindex to create indexes in a collection 
      useCreateIndex: true
    });
    // log that the database is connected
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // if error is caught log the error
    console.error(err);
    // exit the process
    process.exit(1);
  }
};

//export the connectDB function to be used
module.exports = connectDB;
