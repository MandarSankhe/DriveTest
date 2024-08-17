const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
    required: true
  },
  isTimeSlotAvailable: {
    type: Boolean,
    default: true // Initially all time slots are available
  }
});

//to make the combination of date and time unique
appointmentsSchema.index({ "date": 1, "time": 1}, { "unique": true });

const appointmentData = mongoose.model("appointmentModel", appointmentsSchema);
module.exports = appointmentData;
