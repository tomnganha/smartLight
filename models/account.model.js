const mongoose = require("mongoose");
const generate = require("../helpers/generate");

//mongoose.Schema.Types.Decimal128
const accountSchema = new mongoose.Schema({
  email: String,
  password: String,
  token: {
    type: String,
    default: generate.generateRandomString(20),
  },
  type: String,
});

const Account = mongoose.model("Account", accountSchema, "Accounts");
module.exports = Account;
