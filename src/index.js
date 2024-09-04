import dotenv from "dotenv";
import connectdb from "./db/index.js";
import express from "express";

const app = express()

connectdb()
  .then(() => {
    app.on("error", (err) => {
      console.log("oop's an error occured ", err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server Is Running On Port NUmber :: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Db Connection failed", err);
  });

dotenv.config({ path: "./env" });
