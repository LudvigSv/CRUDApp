var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("respond with a resource");
});

// router.get("/profile", (req, res) => {
//   res.render("profile");
//   console.log("yoooooo");
// });

module.exports = router;
