const mongoose = require("mongoose");
const mode = new mongoose.Schema({
  title: String,
  powerSavingMode: String,
});

const Mode = mongoose.model("Mode", mode, "mode");
module.exports = Mode;
