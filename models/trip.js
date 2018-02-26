const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  destination: String,
  pickupLocation: String,
  departureDate: String,
  seats: Number,
  music: String,
  _creator: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
