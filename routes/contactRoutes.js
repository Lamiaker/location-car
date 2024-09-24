const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Route pour envoyer un message de contact
router.post("/", contactController.sendMessage);

// Route pour afficher tous les messages de contact (admin)
router.get("/", contactController.getAllMessages);

module.exports = router;
