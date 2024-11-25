const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/systems");
//[GET] /admin/account
module.exports.index = async (req, res) => {
  let find = {};
  const records = await Account.find(find).select("email type");
  res.render("admin/pages/account/index", {
    titlePage: "Login Page",
    records: records,
  });
};

//[GET] /admin/account/create
module.exports.create = (req, res) => {
  res.render("admin/pages/account/create", {
    titlePage: "Create Account Page",
  });
};

//[POST] /admin/account/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({ email: req.body.email });
  if (emailExist) {
    req.flash("error", "This email already exists");
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    req.flash("success", "Account created successfully");

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
