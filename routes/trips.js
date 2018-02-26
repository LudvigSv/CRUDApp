var express = require("express");
var router = express.Router();

const Trip = require("../models/trip");

/* GET users listing. */
router.get("/trips", function(req, res, next) {
  res.render("trips");
});

router.get("/trips-all", (req, res, next) => {
  res.render("trips-all");
});

// Route Handler for Create Trip - POST
router.post("/trips", (req, res, next) => {
  // checking for current user
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  // Take the params and translate them into a new object
  const newTrip = new Trip({
    // first destination is from the schema
    // req.body is from body parser
    // second destination is the name in the form
    destination: req.body.destinationInput,
    pickupLocation: req.body.pickupLocationInput,
    departureDate: req.body.departureDateInput,
    seats: req.body.seatsInput,
    music: req.body.musicInput,
    _creator: req.user._id
  });

  // Create a new Trip with the Params passed
  // in from the "/trips/new" form
  // const newTrip = new Trip(tripInfo);

  newTrip.save(err => {
    // Error Handling
    if (err) {
      return next(err);
    }

    // Redirect to the List of Trips (/trips)
    // if it saves.
    // redireting to a URL
    return res.redirect("/");
  });
});

module.exports = router;
