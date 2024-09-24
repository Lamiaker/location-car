// Importation des modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// Importation des routes
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
// Initialisation de l'application Express
const app = express();

// Middleware de sécurité
app.use(helmet());

// Limiteur de requêtes pour éviter les abus
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
});
app.use(limiter);

// Middleware pour gérer les requêtes cross-origin
app.use(cors());

// Middleware pour parser les données des requêtes
app.use(express.json()); // Pour les requêtes en JSON
app.use(express.urlencoded({ extended: true })); // Pour les formulaires
app.use(express.static("public"));
// Connexion à MongoDB
const port = process.env.PORT || 3000;
const MongoDB_URL = process.env.DATABASE_LOCAL;
//connect to database
if (!MongoDB_URL) {
  console.error("DATABASE_LOCAL is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(MongoDB_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

// Déclaration des routes
app.use("/api/cars", carRoutes); // Routes pour les voitures
app.use("/api/reservations", reservationRoutes); // Routes pour les réservations
app.use("/api/contact", contactRoutes); // Routes pour les messages de contact
app.use("/api/admin", adminRoutes); // Routes pour les interaction de ladmin
// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ressource non trouvée" });
});

// Démarrage du serveur

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
