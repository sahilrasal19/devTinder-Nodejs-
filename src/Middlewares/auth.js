const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const adminAuth = (req, res, next) => {
//   console.log("admin auth");
//   const token = "xyz";

//   const isAdminAuth = token === "xyz";
//   if (isAdminAuth) {
//     next();
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// };
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder742", {
      expiresIn: "1d",
    }); // verify if usr of this token exists
    const { _id } = decodedObj;
    const user = await User.findById(_id); // find user and store obj in const user
    if (!user) {
      throw new Error("User did not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
