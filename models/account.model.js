const mongoose = require("mongoose");
//mongoose.Schema.Types.Decimal128
const accountSchema = new mongoose.Schema({
  email: String,
  password: String,
  type: String,
});

const Account = mongoose.model("Account", accountSchema, "Accounts");
module.exports = Account;
