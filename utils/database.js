import mongoose from "mongoose";

let isConnected = false;

export const connectTODB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("connected already to DB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
