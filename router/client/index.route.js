const deviceRoutes = require("./device.route");
const HomeRouter = require("./home.route");
module.exports = (app) => {
  app.use("/", HomeRouter);
  app.use("/device", deviceRoutes);
};
