const express = require("express");

const app = express();

app.get("/best", (req, res) => {
  res.send("sent success using get");
});

app.post("/best", (req, res) => {
  res.send("sent success using post");
});

app.use("/test/:username/:password", (req, res) => {
  console.log(req.params);
  res.send("hello test");
});

app.use("/", (req, res) => {
  res.send("hello brother");
});

app.listen(7777, () => {
  console.log("server is running successfully on 7777");
});
