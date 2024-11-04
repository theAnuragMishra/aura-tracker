import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat_app");
    console.log("DB connected");
  } catch (error) {
    if (error instanceof Error)
      console.error("MongoDB connection failed:", error.message);
  }
};
