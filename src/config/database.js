const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sahilrasal742:6sJojztqisA35SfJ@nodejs.0doepbo.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
