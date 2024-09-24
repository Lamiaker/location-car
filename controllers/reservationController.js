const reservation = require("../models/Resarvation");
const Car = require("../models/Car");
exports.createReservation = async (req, res) => {
  const newReservation = new reservation(req.body);
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
      .populate("voiture");

    if (!Reservation) {
      return res.status(404).json({
        status: "fail",
        message: "Réservation introuvable",
      });
    }

    // Mettre à jour le statut de la réservation
    Reservation.statut = newStatus;

    // Si la réservation est confirmée, mettre à jour la disponibilité de la voiture
    if (newStatus === "confirmée") {
      Reservation.voiture.disponibilite = false;
    } else if (newStatus === "annulée") {
      Reservation.voiture.disponibilite = true;
    }

    // Sauvegarder les changements de la voiture et de la réservation
    await Reservation.save();
    await Reservation.voiture.save();

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
