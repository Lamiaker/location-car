const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Par défaut, la date actuelle est enregistrée
    },
  },
  {
    timestamps: true, // Ajoute les champs createdAt et updatedAt
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
