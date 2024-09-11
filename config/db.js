const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG0DB_URL)
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Couldn't connect to database", error);
  }
}

module.exports = connectDB; 