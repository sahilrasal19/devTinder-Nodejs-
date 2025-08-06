const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.get("/user", async (req, res) => {
  console.log(req.body.emailId);
  const userEmail = await User.find({ emailId: req.body.emailId });
  try {
    res.send(userEmail);
  } catch {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  console.log(req.body);
  const users = await User.find({});
  try {
    res.send(users);
  } catch {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const user = req.body.id;
  const userId = await User.findOneAndDelete({ _id: user });
  try {
    res.send("Deleted User");
  } catch (err) {
    res.status(400).send("Error deleting the user" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const user = req.body.id;
  const data = req.body;
  // console.log(user);
  const userId = await User.findByIdAndUpdate({ _id: user }, data);
  try {
    res.send("User info updated successfully");
  } catch {
    res.status(400).send("Error deleting the user" + err.message);
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
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
