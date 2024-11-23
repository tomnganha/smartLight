const systemConfig = require("../../config/systems");

const dashboardRoutes = require("./dashboard.router");
const devicesRoutes = require("./devices.router");
const PATH_ADMIN = systemConfig.prefixAdmin;
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/devices", devicesRoutes);
};
