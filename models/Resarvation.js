const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    voiture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // Référence à l'ID d'une voiture dans le modèle Car
      required: true,
    },
    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
      required: true,
    },
    statut: {
      type: String,
      enum: ["en attente", "confirmée", "annulée"], // Différents statuts de la réservation
      default: "en attente",
    },
  },
  {
    timestamps: true, // Ajoute les champs createdAt et updatedAt
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
