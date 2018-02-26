const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Configure Express Layouts / Mongoose

const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Authentication / Authorization
const passport = require("passport");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");
// Passport Strategy and Configuration
const bcrypt = require("bcrypt");
require("./config/passport-config.js");
mongoose.connect("mongodb://localhost/SampProject-development");

const index = require("./routes/index");
const users = require("./routes/users");
const trips = require("./routes/trips");
const authRoutes = require("./routes/authentication.js");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Express Layouts
app.set("layout", "layouts/main-layout");
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Sessions
app.use(
  session({
    secret: "sample-projectdev",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Authentication Configuration
app.use((req, res, next) => {
  if (typeof req.user !== "undefined") {
    // userSignedIn is a just placehlder that i'm using in my ejs
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});

// ROUTES GO HERE (middleware that goes always before 404)
app.use("/", index);
app.use("/users", users);
app.use("/", trips);
app.use("/", authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
