const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
// connect-ensure-login Configuration
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

// Display Login Form
router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login");
});

// Handle Submission of Login Form
router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

// Display Signup Form
router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup");
});

// Handle Submission of Signup Form
router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  })
);

// router.post("/signup", ensureLoggedOut(), (req, res, next) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   const neighborhood = req.body.neighborhood;

//   if (username === "" || password === "") {
//     res.render("auth/signup", { message: "Indicate username and password" });
//     return;
//   }

//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);
//     console.log("username", username);
//     console.log("pass", password);

//     const newUser = new User({
//       username,
//       email,
//       password: hashPass,
//       neighborhood
//     });

//     newUser.save(err => {
//       if (err) {
//         res.render("auth/signup", { message: "Something went wrong" });
//       } else {
//         res.redirect("/");
//       }
//     });
//   });
// });

// New Trip Route
// router.get("/trips", ensureLoggedIn(), (req, res, next) => {
//   res.render("trips");
// });

// Handle Logout
router.post("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
