const Device = require("../../models/device.model");

module.exports.index = async (req, res) => {
  const devices = await Device.find({ status: "on" });
  res.render("client/pages/devices/index", {
    titlePage: "Devices",
    devices: devices,
  });
};
