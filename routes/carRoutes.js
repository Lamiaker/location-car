const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// Route pour lister toutes les voitures
router.get("/", carController.getAllCars);

// Route pour récupérer les détails d'une voiture spécifique
router.get("/:id", carController.getCarById);

// Route pour ajouter une nouvelle voiture (seulement pour l'admin)
router.post("/", carController.createCar);

// Route pour mettre à jour une voiture existante (seulement pour l'admin)
router.put("/:id", carController.updateCar);

// Route pour supprimer une voiture (seulement pour l'admin)
router.delete("/:id", carController.deleteCar);

module.exports = router;
