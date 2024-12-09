const StartSchedule = require("../../config/schedule.config");
const Schedule = require("../../models/schedule.model");
const Device = require("../../models/device.model");
const Report = require("../../models/report.model");
//[GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  StartSchedule();
  const count_light = await Device.countDocuments();
  const schedule = await Schedule.findOne().select("onTime offTime");

  const power = 5;
  const count_reports = await Report.countDocuments();
  console.log(schedule);
  res.render("admin/pages/dashboard/index", {
    titlePage: "Dashboard",
    count_light: count_light,
    schedule: schedule,
    onTime: schedule.onTime,
    offTime: schedule.offTime,
    power: power,
    count_reports: count_reports,
  });
};
