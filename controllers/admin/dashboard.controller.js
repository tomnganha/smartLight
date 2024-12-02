const StartSchedule = require("../../config/schedule.config");
//[GET] /admin/dashboard
module.exports.dashboard = (req, res) => {
  StartSchedule();
  res.render("admin/pages/dashboard/index", { titlePage: "Dashboard" });
};
