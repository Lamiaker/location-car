const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const reservationController = require("../controllers/reservationController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get(
  "/getAllReservations",
  authController.protect,
  reservationController.getAllReservations
);
router.post(
  "/createReservation",
  authController.protect,
  reservationController.createReservation
);
router.patch(
  "/updateMe",
  authController.protect,
  authController.uploadUserPhoto,
  authController.resizeUserPhoto,
  authController.updateMe
);
// pour afficher le profile admin
router.get("/information", authController.protect, authController.getuser);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.patch(
  "/updateReservationStatus",
  authController.protect,
  authController.restrictTo("admin"), // S'assurer que seule l'admin peut changer le statut
  reservationController.updateReservationStatus
);

module.exports = router;
