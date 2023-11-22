require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_CLOUD_URL}/${process.env.DATABASE_CLOUD_NAME}?${process.env.DATABASE_CLOUD_OPTIONS}`
      //`${process.env.DATABASE_URL}/${process.env.DATABASE}?AuthSource=admin`
    )
    console.log("Connected to database")
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB
