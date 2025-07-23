const mongoose  = require('mongoose')
require('dotenv').config()

const ConnectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Stop the server if DB connection fails
  }
};
module.exports = ConnectToDB;
