const Report = require("../../models/report.model");
const systemConfig = require("../../config/systems");

//[GET] /admin/report
module.exports.index = async (req, res) => {
  const reports = await Report.find({});
  console.log(reports);
  res.render("admin/pages/report/index", {
    titlePage: "Reports",
    reports: reports,
  });
};
