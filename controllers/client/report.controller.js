const Device = require("../../models/device.model");
const Report = require("../../models/report.model");
//[GET] /report/:id
module.exports.index = async (req, res) => {
  console.log(req.params);
  let device = await Device.findOne({ _id: req.params.id }).select("_id title");
  console.log(device.title, device._id);
  console;
  res.render("client/pages/reports/index", {
    titlePage: "Report",
    light_id: device._id,
    light_title: device.title,
  });
  //res.send("OK");
};
//[POST] /report/:id
module.exports.indexPost = async (req, res) => {
  console.log(req.body);
  const now = new Date();
  let time = `${now.getHours()}:${now.getMinutes()}`;
  let date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  console.log(time, typeof time);
  console.log(date, typeof time);
  const report_content = {
    light_id: req.body.light_id,
    light_title: req.body.light_title,
    description: req.body.description,
    status: "checking",
    time: time,
    date: date,
  };
  const report = new Report(report_content);
  await report.save();
  console.log("report: ", report);
  req.flash("success", "reported successfully");
  res.redirect(`/`);
};
