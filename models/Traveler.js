// models/Traveler.js
const mongoose = require('mongoose');

const travelerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomType: String,
  noOfBeds: Number,
  checkinDate: Date
});

module.exports = mongoose.model('Traveler', travelerSchema);
