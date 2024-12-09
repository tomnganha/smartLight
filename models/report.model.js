const mongoose = require("mongoose");
const report = new mongoose.Schema({
  light_id: String,
  light_title: String,
  status: String,
  description: String,
  time: String,
  date: String,
});

const Report = mongoose.model("Report", report, "Reports");
module.exports = Report;
