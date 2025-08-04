const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sahil",
    lastName: "Rasal",
    email: "sahil@gmail.com",
    password: "sahil123",
  });
  try {
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(500).send("Error saving the user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("server is running successfully on 7777");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
