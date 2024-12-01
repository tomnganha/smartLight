function connectionSocketIo() {
  _io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    //socket.emit("SERVER_SEND_STATUS_FROM_MQTT", lightStates);
  });
}
module.exports = {
  connectionSocketIo: connectionSocketIo,
};
