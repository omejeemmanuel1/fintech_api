import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://omejeemmanuel:zgzr9veQL593zUv5@cluster0.a7kti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB connected Successfully");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};
export default db;
