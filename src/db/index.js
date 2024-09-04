import mongoose from "mongoose";
import { DB_NAME } from "../Constant.js";

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `Mongodb Connected !! host connected ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongo db error occurred", error);
    process.exit(1);
  }
};

export default connectdb;
