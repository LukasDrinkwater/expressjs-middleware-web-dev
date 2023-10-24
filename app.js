const express = require("express");

const app = express();

// if the middleware is passed like this it runs everytime
// and before each of the things below
// Runs in order that you define it
app.use(logger);

app.get("/", (req, res) => {
  console.log("home page");

  res.send("Home page");
});

app.get("/users", (req, res) => {
  // this can see req.admin because the auth middleware is triggered
  // and req. is passed down
  // console.log(`user is admin = ${req.admin}`);
  console.log("users page");
  res.send("users page");
});

function logger(req, res, next) {
  // console.log(req.originalUrl);
  console.log("before");
  next();
  console.log("after");
}
function auth(req, res, next) {
  if (req.query.admin === "true") {
    // you can pass a variable to the get on /users by adding something to the req.
    req.admin = true;
    next();
  } else {
    res.send("no auth");
  }
}

app.listen(3000);
