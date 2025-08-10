const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignupData(req);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      // const { token } = req.cookies;

      // console.log(req.cookies.token);
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder742"); // creating a token
      console.log(token);
      res.cookie("token", token); // send token to postman/browser/client
      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    // console.log(jsonWebToken);

    // res.send(" Welcome to your profile");
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedValue = await jwt.verify(token, "DEV@Tinder742");
    console.log(decodedValue);
    const { _id } = decodedValue;
    console.log("Logged In user is: " + _id);
    const user = await User.findById(_id);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  console.log(req.body.emailId);
  const userEmail = await User.find({ emailId: req.body.emailId });
  try {
    res.send(userEmail);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  console.log(req.body);
  const users = await User.find({});
  try {
    res.send(users);
  } catch (err) {
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

app.patch("/user/:id", async (req, res) => {
  const user = req.params?.id;
  const data = req.body;
  // console.log(user);
  const userId = await User.findByIdAndUpdate({ _id: user }, data, {
    runValidators: true,
  });
  try {
    const ALLOWED_UPDATES = ["skills", "about", "age", "gender", "photoUrl"];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdates) {
      throw new Error("Invalid update");
    }
    if (data?.skills.length > 4) {
      throw new Error(" Skills cannot be more than 4");
    }
    res.send("User info updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is running successfully on 7777");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
