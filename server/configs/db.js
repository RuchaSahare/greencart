import mongoose from "mongoose";

const connectDB = async () => {
  try {

    mongoose.connection.on("connected", () => {
      console.log("MongoDB Database Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB Connection Error:", err);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);

  } catch (error) {
    console.log("Database Connection Failed:", error.message);
  }
};

export default connectDB;