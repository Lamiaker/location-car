const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true, // remove whitespace from the beginning and end of the string
      minlength: 2, // minimum length of the string
      maxlength: 50, // maximum length of the string
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    number: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    pickup_date: {
      type: Date,
      required: true,
    },
    return_date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
    },
    state: {
      type: String,
      
      enum: ["confirmed", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Add custom validation for pickup and return dates
reservationSchema.path("pickup_date").validate(function (value) {
  return value >= Date.now();
}, "Pickup date must be in the future");

reservationSchema.path("return_date").validate(function (value) {
  return value >= this.pickup_date;
}, "Return date must be after pickup date");

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
