const markers = require("./script");
const socket = io();
console.log("ok socketio js");
console.log(markers);
socket.on("SERVER_SEND_STATUS_FROM_MQTT", (data) => {
  console.log("client received data from mqtt");
  console.log(data);
  const bulkOps = Object.keys(data);
  console.log(bulkOps);
  bulkOps.map((light) => {});
});
