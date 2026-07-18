const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName},Your Profile Updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = { profileRouter };
