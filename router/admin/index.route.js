const systemConfig = require("../../config/systems");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRoutes = require("./dashboard.router");
const devicesRoutes = require("./devices.router");
const authRoutes = require("./auth.router");
const accountRoutes = require("./accounts.router");
const scheduleRoutes = require("./schedule.router");
const PATH_ADMIN = systemConfig.prefixAdmin;
module.exports = (app) => {
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes
  );
  app.use(PATH_ADMIN + "/devices", authMiddleware.requireAuth, devicesRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
  app.use(PATH_ADMIN + "/schedule", authMiddleware.requireAuth, scheduleRoutes);
};
