// Here is where we import modules
// We begin by loading Express
const express = require('express');

const app = express();
const port = 3000

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});