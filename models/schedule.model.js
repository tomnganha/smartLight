const mongoose = require("mongoose");
const schedule = new mongoose.Schema({
  title: String,
  onTime: String,
  offTime: String,
});

const Schedule = mongoose.model("Schedule", schedule, "schedule");
module.exports = Schedule;
