const mqtt = require("mqtt");
const lightStatusHelper = require("../helpers/lightStatus.helper");

var options = {
  host: "04f4aeeea4d84429864135c7870eb612.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "thai",
  password: "123456",
};
//topic change status light
global._PUBLISH_TOPIC = "pbl3-esp32-001/lights/control";
global._SUBSCRIBE_TOPIC = "pbl3-esp32-001/lights/status";
// initialize the MQTT client
var client = mqtt.connect(options);

//const topic = "pbl3-esp32-001/lights/status";
const topic = _SUBSCRIBE_TOPIC;
module.exports.connectMqtt = async () => {
  try {
    await client.on("connect", () => {
      console.log("MQTT broker is Connected");
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    });
  } catch (error) {
    console.log("Connect to Mqtt Broker failed");
  }
  setInterval(() => {
    if (client.connected) {
      client.publish("thai12345678910/nodejs", "ping");
    }
  }, 30000);
  client.on("close", () => {
    console.log("MQTT connection closed. Reconnecting...");
    client.reconnect();
  });

  client.on("offline", () => {
    console.log("MQTT client is offline. Check network or broker.");
  });
};
module.exports.client = client;
module.exports.handlerDataFromMQTT = (client) => {
  client.on("message", (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
    lightStates = JSON.parse(payload.toString());
    lightStatusHelper.updateDatabase(lightStates); //update status lights len database
    //update status lights len giao dien
    _io.emit("SERVER_SEND_STATUS_FROM_MQTT", lightStates);
  });
};
