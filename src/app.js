const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/requests");
const { userRouter } = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.patch("/user/:id", async (req, res) => {
//   const user = req.params?.id;
//   const data = req.body;
//   // console.log(user);
//   const userId = await User.findByIdAndUpdate({ _id: user }, data, {
//     runValidators: true,
//   });
//   try {
//     const ALLOWED_UPDATES = ["skills", "about", "age", "gender", "photoUrl"];
//     const isAllowedUpdates = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k),
//     );
//     if (!isAllowedUpdates) {
//       throw new Error("Invalid update");
//     }
//     if (data?.skills.length > 4) {
//       throw new Error(" Skills cannot be more than 4");
//     }
//     res.send("User info updated successfully");
//   } catch (err) {
//     res.status(400).send("UPDATE FAILED:" + err.message);
//   }
// });

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
