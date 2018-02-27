var express = require("express");
var router = express.Router();

const Trip = require("../models/trip");

/* GET users listing. */
router.get("/trips", function(req, res, next) {
  res.render("trips");
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
    gasEstimate: req.body.gasInput,
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

router.get("/find-rides", (req, res, next) => {
  Trip.find((err, trips) => {
    if (err) {
      return next(err);
    }
    res.render("find-rides", { trips: trips });
  });
});

router.get("/:id", (req, res, next) => {
  Trip.findById(req.params.id, (err, trip) => {
    if (err) {
      return next(err);
    }
    console.log("found trip is:", trip);
    // return res.send("trips");
  });
});

// claiming the trips
router.post("/:id/add", (req, res, next) => {
  // find the trip
  const tripId = req.params.id;
  Trip.findById(tripId, (err, theTrip) => {
    if (err) {
      next(err);
      return;
    }
    req.user.rides.push(theTrip._id);
    theTrip.passengers.push(req.user._id);
    console.log("================");
    console.log("user with the rides: ", req.user);
    console.log("the trip: ", theTrip);
    console.log("================");

    res.redirect("/");
  });
});

module.exports = router;
