const express = require("express");

const app = express();

app.use("/best", (req, res) => {
  res.send("hello best");
});

app.use("/test", (req, res) => {
  res.send("hello test");
});

app.use((req, res) => {
  res.send("hello sssrother");
});

app.listen(7777, () => {
  console.log("server is running successfully on 7777");
});
