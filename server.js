const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
console.log(process.env)
// Here is where we import modules
// We begin by loading Express
const express = require('express');
const mongoose = require("mongoose"); // require package

const app = express();
const port = process.env.port
// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
// error handling
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
// log connection status to terminal on start
db.on("connected", () => {
  console.log(`Connected to MongoDB ${db.name}.`);
});
// disconnected
db.on("disconnected", () => {
  console.log(`Disconnected from MongoDB ${db.name}.`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});