const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
console.log(process.env)
// Here is where we import modules
// We begin by loading Express
const express = require('express');
const mongoose = require("mongoose"); // require package
const app = express();
const port = process.env.PORT
// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
// error handling
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
// log connection status to terminal on start
db.on("connected", () => {
  console.log(`Connected to MongoDB ${port}.`);
});
// disconnected
db.on("disconnected", () => {
  console.log(`Disconnected from MongoDB ${port}.`);
});


// the above is our database connection logic




// below is our route handling logic

const Fruit =  require('./models/fruit.js') // import fruit model


// we want middleware before our routes
app.use(express.urlencoded({ extended: false }));// this is a built in url function
// Parse URL-encoded bodies
// extended = false because we want to parse the data as key-value pairs,
// false is the qs library (more limitting)
// true is the querystring library



// GET /landing page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /fruits/new page
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
});

// POST /fruits route
app.post("/fruits", async (req, res) => {
  //  if (req.body.isReadyToEat === "on") {
   //    req.body.isReadyToEat = true;
  //  } else {
  //      req.body.isReadyToEat = false;
  //  }
// or you can use ternary operator
 req.body.isReadyToEat ==='on' ? req.body.isReadyToEat = true : req.body.isReadyToEat = false;

 try {
const newFruit = await Fruit.create(req.body);
console.log(newFruit);
} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
 }
res.redirect("/fruits/new");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
