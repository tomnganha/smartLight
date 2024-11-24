const systemConfig = require("../../config/systems");

const dashboardRoutes = require("./dashboard.router");
const devicesRoutes = require("./devices.router");
const authRoutes = require("./auth.router");
const PATH_ADMIN = systemConfig.prefixAdmin;
module.exports = (app) => {
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/devices", devicesRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);
};
