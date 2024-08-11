import mongoose from "mongoose";

// MongoDB connection

export default async function connectDB(url: string) {
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`DB connection error - ${err}`));
}
