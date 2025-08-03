const express = require("express");

const app = express();

app.get(
  "/best",
  (req, res, next) => {
    next();
    // res.send("sent success using get");
  },
  (req, res, next) => {
    next();
    // res.send("handler 2");
  },
  (req, res) => {
    // res.send("handler 3");
  },
  (req, res) => {
    res.send("handler 4");
  }
);

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
