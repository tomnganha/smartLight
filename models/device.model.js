const mongoose = require("mongoose");
//mongoose.Schema.Types.Decimal128
const deviceSchema = new mongoose.Schema({
  _id: String,
  title: String,
  location: {
    latitude: { type: mongoose.Schema.Types.Decimal128 },
    longitude: { type: mongoose.Schema.Types.Decimal128 },
  },
  status: String,
  brightness_level: Number,
  last_maintenance: Date,
  installation_date: Date,
  type: String,
});

const Device = mongoose.model("Device", deviceSchema, "Devices");
module.exports = Device;
