import mongoose from "mongoose";

export const connectDb = async (mongoUri) => {
  if (!mongoUri) throw new Error("MONGO_URI is required");

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 10000
  });

  return mongoose.connection;
};
