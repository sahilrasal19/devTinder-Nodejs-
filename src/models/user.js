const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid Email");
      },
    },
    password: {
      type: String,
      required: true,
      // unique: true,
      minLength: 8,
      maxLength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Weak Password, Please use a strong password");
      },
    },
    age: {
      type: Number,
      // required: true,
      min: 18,
    },
    gender: {
      type: String,
      // required: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "www.yotube.com",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Invalid URL");
      },
    },
    about: {
      type: String,
      default: "This is default value of about field",
      maxLength: 200,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  console.log(this);
  const user = this; // yaha user.js mai this use hota hai bcoz jo banda hai uska info isme hai isliye apan ne user mai this ka sab value daala
  const token = await jwt.sign(
    { _id: user._id },
    "DEV@Tinder742"
    // expiresIn("7d")
  );
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const Hashedpassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    Hashedpassword
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
