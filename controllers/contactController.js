const contact = require("../models/Contact");
exports.sendMessage = async (req, res) => {
  const newContact = new contact(req.body);
  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const contacts = await contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
};
