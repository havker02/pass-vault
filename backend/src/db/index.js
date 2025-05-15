import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to db")
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connectDB