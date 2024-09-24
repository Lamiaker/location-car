const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Route pour faire une réservation
router.post("/", reservationController.createReservation);

// Route pour vérifier la disponibilité d'une voiture
router.get("/check/:carId", reservationController.checkAvailability);

// Route pour lister toutes les réservations (admin seulement)
router.get("/", reservationController.getAllReservations);

module.exports = router;
