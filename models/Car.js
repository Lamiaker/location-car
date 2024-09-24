const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    marque: {
      type: String,
      required: true,
    },
    modele: {
      type: String,
      required: true,
    },
    annee: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL de l'image de la voiture
      required: true,
    },
    prixParJour: {
      type: Number,
      required: true,
    },
    disponibilite: {
      type: Boolean,
      required: true,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
