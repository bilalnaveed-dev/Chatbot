import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.Db_url) {
      throw new Error("Db_url is missing from .env");
    }

    await mongoose.connect(process.env.Db_url, {
      dbName: "ChatbotMERN",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Mongo db connected");
  } catch (error) {
    console.error("Mongo db connection failed:", error.message);
    throw error;
  }
};

export default connectDb;
