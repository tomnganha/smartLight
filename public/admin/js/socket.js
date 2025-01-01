const socket = io();

socket.on("SERVER_SEND_STATUS_FROM_MQTT", (data) => {
  const bulkOps = Object.keys(data);
  bulkOps.map((light) => {
    let lightEle = document.querySelector(`.${light}`);
    if (lightEle) {
      if (data[light] == "on") {
        lightEle.classList.remove("bg-secondary");
        lightEle.classList.add("bg-success");
        lightEle.setAttribute("data-status", "on");
        lightEle.innerHTML = "On";
      }
      if (data[light] == "off") {
        lightEle.classList.remove("bg-success");
        lightEle.classList.add("bg-secondary");
        lightEle.setAttribute("data-status", "off");
        lightEle.innerHTML = "Off";
      }
    }
  });
});
