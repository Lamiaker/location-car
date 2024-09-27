const reservation = require("../models/Resarvation");
const Car = require("../models/Car");
const { log } = require("util");
const { abort } = require("process");
const exp = require("constants");
exports.createReservation = async (req, res) => {
  const newReservation = new reservation(req.body);

  let price = await Car.findById(newReservation.car);
  price = price.prixParJour;
  const pickupDate = new Date(req.body.pickup_date).getTime();
  const returnDate = new Date(req.body.return_date).getTime();
  const differenceInMs = returnDate - pickupDate;
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  newReservation.price = price * differenceInDays;

  try {
    const savedReservation = await newReservation.save();

    res.status(200).json(savedReservation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const car = await reservation.findOne({ voiture: req.params.carId });
    if (car) {
      res.status(200).json("Voiture n'est pas disponible");
    } else {
      res.status(200).json("Voiture est disponible");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const { reservationId, newStatus } = req.body;

    // Trouver la réservation
    const Reservation = await reservation
      .findById(reservationId)
      .populate("car");
    console.log(Reservation);

    if (!Reservation) {
      return res.status(404).json({
        status: "fail",
        message: "Réservation introuvable",
      });
    }

    // Mettre à jour le statut de la réservation
    Reservation.state = newStatus;
    
    // Si la réservation est confirmée, mettre à jour la disponibilité de la voiture
    if (newStatus === "confirmed") {
      Reservation.car.disponibilite = false;
      // Reservation.state = newStatus;
    } else if (newStatus === "pending") {
      Reservation.car.disponibilite = true;
      // Reservation.state = newStatus;
    }

    // Sauvegarder les changements de la voiture et de la réservation
    await Reservation.save();
    await Reservation.car.save();

    res.status(200).json({
      status: "success",
      data: {
        Reservation,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.deleteReservation = async (req, res) => {
  try {
    const reservations = await reservation.findById(req.params.id);
    await reservations.deleteOne();
    res.status(200).json("Reservation has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservation.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const info = await Car.findById(updatedReservation.car);
  
    updatedReservation.car = info;
    
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(500).json(err);
  }
};