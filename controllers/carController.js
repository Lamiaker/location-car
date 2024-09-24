const car = require("../models/Car");
exports.createCar = async (req, res) => {
  const newCar = new car(req.body);
  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAllCars = async (req, res) => {
  try {
    const cars = await car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getCarById = async (req, res) => {
  try {
    const carId = await car.findById(req.params.id);
    res.status(200).json(carId);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await car.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await car.findByIdAndDelete(req.params.id); // Delete car by ID
    res.status(200).json("Car has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};
