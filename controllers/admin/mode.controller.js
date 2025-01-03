const Mode = require("../../models/mode.model");
const systemConfig = require("../../config/systems");
const mqttConfig = require("../../config/mqtt.config");

//[GET] /admin/mode
module.exports.index = async (req, res) => {
  const mode = await Mode.findOne({ title: "mode" });

  console.log(mode);
  res.render("admin/pages/mode/index", {
    titlePage: "Mode",
    mode: mode,
  });
};
//[PATCH] /admin/mode/change-powerSavingMode/:status/:data_mode
module.exports.powerSavingModePatch = async (req, res) => {
  const client = mqttConfig.client;
  let data = { [req.params.data_mode]: req.params.status };
  data = JSON.stringify(data);
  console.log(req.params.data_mode, req.params.status);
  client.publish(_PUBLISH_TOPIC, data, (error) => {
    if (error) {
      console.error(error);
    }
  });
  await Mode.updateOne(
    { title: "mode" },
    { powerSavingMode: req.params.status }
  );
  req.flash("success", "Status updated successfully");
  res.redirect("back");
  //   res.send("OK");
};
module.exports.autoLightModePatch = async (req, res) => {
  const client = mqttConfig.client;
  let data = { [req.params.data_mode]: req.params.status };
  data = JSON.stringify(data);
  console.log(req.params.data_mode, req.params.status);
  client.publish(_PUBLISH_TOPIC, data, (error) => {
    if (error) {
      console.error(error);
    }
  });
  await Mode.updateOne({ title: "mode" }, { autoLightMode: req.params.status });
  req.flash("success", "Status updated successfully");
  res.redirect("back");
  // res.send("OK");
};

module.exports.brightnessModePatch = async (req, res) => {
  const client = mqttConfig.client;
  let data = { brightness_normal: req.body.brightness_normal };
  data = JSON.stringify(data);
  console.log(data);
  client.publish(_PUBLISH_TOPIC, data, (error) => {
    if (error) {
      console.error(error);
    }
  });
  console.log(req.body.brightness_normal);
  try {
    await Mode.updateOne(
      { title: "mode" },
      { brightness_normal: req.body.brightness_normal }
    );
    req.flash("success", "updated successfully");
    res.redirect(`${systemConfig.prefixAdmin}/devices`);
  } catch (error) {
    console.log("error");
    res.redirect("back");
  }
};
