const mongoose = require('mongoose');

const CarTreatmentSchema = new mongoose.Schema({
  Treatment_Number: {
    type: String,
    required: true,
  },
  Treatment_Information: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Worker_email: { type: String, required: true },
  Car_Number: { type: String, required: true },
});

module.exports = mongoose.model('car_treatments', CarTreatmentSchema);
