import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// userschema with the help of mongoose
const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url use
      required: true,
    },
    coverimage: {
      type: String,
    },
    watchhistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true || "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// pre hooks middleware 
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(err);
  }
});

// Function to check the password is correct 
userschema.methods.isPasswordCorrect = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};


// if statement if password is wrong
if (!isPasswordCorrect)
  return res.status(400).json({ error: "Invalid credentials" });



//Created a AccessToken jwt
userschema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};



// Created  RefreshToken jwt
userschema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    { _id: this._id, username: this.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};



export const User = mongoose.model("User", userschema);
