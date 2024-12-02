const Schedule = require("../models/schedule.model");
const schedule = require("node-schedule");
const mqttConfig = require("./mqtt.config");

const client = mqttConfig.client;
global._SCHEDULE_TIME_ONOFF = "schedule_light_onOff";
async function StartSchedule() {
  console.log("start");
  let { onTime, offTime } = await Schedule.findOne({
    title: _SCHEDULE_TIME_ONOFF,
  });

  console.log(onTime, offTime);
  if (onTime) {
    const onTime_hour = onTime.split(":")[0];
    const onTime_minute = onTime.split(":")[1];
    console.log(onTime_hour, onTime_minute);
    const jobOn = schedule.scheduleJob(
      `${onTime_minute} ${onTime_hour} * * *`,
      function () {
        let data = JSON.stringify({ status: "on" });
        console.log(data);
        client.publish(_PUBLISH_TOPIC, data, (error) => {
          if (error) {
            console.error(error);
          }
        });
        console.log("gui on");
      }
    );
  }
  if (offTime) {
    const offTime_hour = offTime.split(":")[0];
    const offTime_minute = offTime.split(":")[1];

    const jobOff = schedule.scheduleJob(
      `${offTime_minute} ${offTime_hour} * * *`,
      function () {
        let data = JSON.stringify({ status: "off" });
        client.publish("pbl3-esp32-001/lights/control", data, (error) => {
          if (error) {
            console.error(error);
          }
        });
        console.log("gui off");
      }
    );
  }
}
module.exports = StartSchedule;
