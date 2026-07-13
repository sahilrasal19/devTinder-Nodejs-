const express = require("express");
const { userAuth } = require("../Middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // const { token } = req.cookies;
    // console.log(jsonWebToken);

    // res.send(" Welcome to your profile");
    // if (!token) {
    //   throw new Error("Invalid Token");
    // }
    // const decodedValue = await jwt.verify(token, "DEV@Tinder742");
    // console.log(decodedValue);
    // const { _id } = decodedValue;
    // console.log("Logged In user is: " + _id);
    // const user = await User.findById(_id);
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = { profileRouter };
