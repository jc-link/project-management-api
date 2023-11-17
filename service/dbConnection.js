require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Connected to database")
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB
