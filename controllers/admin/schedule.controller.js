const Schedule = require("../../models/schedule.model");
const systemConfig = require("../../config/systems");

//[GET] /admin/schedule
module.exports.schedule = async (req, res) => {
  console.log("schedule time");
  const scheduleTime = await Schedule.findOne({
    title: "schedule_light_onOff",
  });
  console.log(scheduleTime.onTime.toString(), scheduleTime.offTime.toString());
  let onTime = scheduleTime.onTime.toString();
  let offTime = scheduleTime.offTime.toString();
  res.render("admin/pages/schedule/index", { onTime, offTime });
};
//[PATCH] /admin/schedule
module.exports.schedulePatch = async (req, res) => {
  try {
    await Schedule.updateOne({ title: _SCHEDULE_TIME_ONOFF }, req.body);
    req.flash("success", "Successful setup time");
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } catch (error) {
    console.log("error", error);
    res.redirect("back");
  }
};
//[PATCH] /admin/schedule/remove
module.exports.removeSchedulePatch = async (req, res) => {
  try {
    await Schedule.updateOne(
      { title: _SCHEDULE_TIME_ONOFF },
      { onTime: "", offTime: "" }
    );
    req.flash("success", "Successful setup time");
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } catch (error) {
    console.log("error", error);
    res.redirect("back");
  }
};
