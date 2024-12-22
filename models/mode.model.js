const mongoose = require("mongoose");
const mode = new mongoose.Schema({
  title: String,
  powerSavingMode: String,
  autoLightMode: String,
  brightness_normal: Number,
});

const Mode = mongoose.model("Mode", mode, "mode");
module.exports = Mode;
