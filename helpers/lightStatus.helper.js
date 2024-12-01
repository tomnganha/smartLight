const Device = require("../models/device.model");
module.exports.updateDatabase = (lightStatus) => {
  try {
    const bulkOps = Object.keys(lightStatus).map(async (light) => {
      await Device.updateOne({ title: light }, { status: lightStatus[light] });
    });
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Database update error:", error);
  }
};
