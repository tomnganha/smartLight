const Account = require("../../models/account.model");
const systemConfig = require("../../config/systems");
const md5 = require("md5");
//[GET] /admin/auth/login
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", { titlePage: "Login Page" });
};

//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  //res.render("admin/pages/auth/login", { titlePage: "Login Page" });
  //console.log(req.body);
  const { email, password } = req.body;

  const user = await Account.findOne({ email: email });

  if (!user) {
    req.flash("error", "Email does not exist");
    res.redirect("back");
    return;
  }
  if (password != user.password) {
    req.flash("error", "Password is incorrect");
    res.redirect("back");

    return;
  }
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};
