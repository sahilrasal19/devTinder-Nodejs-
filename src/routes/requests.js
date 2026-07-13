const express = require("express");
const { userAuth } = require("../Middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  const { firstName } = user;
  res.send(firstName + " sent a connection request");
});

module.exports = { requestRouter };
