const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connect to DB');
    });

    connection.on('error', err => {
      console.log('Error connecting to DB: ', err);
    });
  } catch (error) {
    console.log('Error connecting to database: ', error);
  }
}

module.exports = connectDB;
