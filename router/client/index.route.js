const deviceRoutes = require("./device.route");
const homeRouter = require("./home.route");
const reportRouter = require("./report.route");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/device", deviceRoutes);
  app.use("/report", reportRouter);
};
