const Device = require("../../models/device.model");

module.exports.index = async (req, res) => {
  var devices = await Device.find({});

  devices = devices.map((device) => {
    return {
      _id: device.id,
      title: device.title,
      status: device.status,
      brightness_level: device.brightness_level,
      last_maintenance: device.last_maintenance,
      installation_date: device.installation_date,
      type_name: device.type,
      location: {
        longitude: device.location.longitude.toString(),
        latitude: device.location.latitude.toString(),
      },
    };
  });

  res.render("client/pages/home/index", {
    titlePage: "Home",
    devices: devices,
  });
  //res.send("ok");
};
