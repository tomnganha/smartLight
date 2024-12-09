const Report = require("../../models/report.model");
const systemConfig = require("../../config/systems");

//[GET] /admin/report
module.exports.index = async (req, res) => {
  //   console.log("schedule time");
  //   const scheduleTime = await Schedule.findOne({
  //     title: "schedule_light_onOff",
  //   });
  //   console.log(scheduleTime.onTime.toString(), scheduleTime.offTime.toString());
  //   let onTime = scheduleTime.onTime.toString();
  //   let offTime = scheduleTime.offTime.toString();
  //   res.render("admin/pages/schedule/index", { onTime, offTime });
  const reports = await Report.find({});
  console.log(reports);
  res.render("admin/pages/report/index", {
    titlePage: "Reports",
    reports: reports,
  });
};
