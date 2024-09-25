import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "150kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import router from "./routes/user.routes.js";

// routes

app.use("/api/users", router); // now this middleware redirect to userrouter which we created in routes/user.routes.js
//http://localhost:8000/api/users/register

export { app };
