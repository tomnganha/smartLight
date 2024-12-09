//const systemConfig = require("../../config/systems");

//const PATH_ADMIN = systemConfig.prefixAdmin;
const socket = io();

var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,

  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
//var marker = L.marker([51.5, -0.09]).addTo(map);
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup();
console.log("ok file script");
var devices = [];
const devicesElement = document.querySelectorAll(".device_item_map");

devicesElement.forEach((item, index) => {
  let _id = item.getAttribute("data-id");
  let latitude = Number(item.getAttribute("data-latitude"));
  let longitude = Number(item.getAttribute("data-longitude"));
  let status = item.getAttribute("data-status");
  let title = item.getAttribute("data-title");
  let type = item.getAttribute("data-type");
  devices[index] = {
    _id,
    title,
    status,
    type,
    location: {
      latitude,
      longitude,
    },
  };
});
console.log(devices);

//createIcon

var greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var greyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
//end createIcon marker.bindPopup(popupContent).openPopup();
var markers = [];
devices.forEach((item, i) => {
  markers[i] = L.marker([item.location.latitude, item.location.longitude], {
    icon: item.status == "on" ? greenIcon : greyIcon,
  })
    .bindPopup(
      `<ul class="ul-popup">
      <li class="li-popup">title: ${item.title}</li>
      <li class="li-popup">Type: ${item.type}</li>
      </ul>
      <div class="d-flex flex-row justify-content-around">
      <a href="/admin/devices/details/${item._id}">Details</a>
      <a href="/report/${item._id}">Report</a>
      </div>
      `
    )
    .openPopup();
});

//update status from MQTT Broker
socket.on("SERVER_SEND_STATUS_FROM_MQTT", (data) => {
  console.log(markers);
  console.log("client received data from mqtt");
  console.log(data);
  const bulkOps = Object.keys(data);
  console.log(bulkOps);
  bulkOps.map((light, index) => {
    if (data[light] == "on") {
      markers[index].setIcon(greenIcon);
    } else if (data[light] == "off") {
      markers[index].setIcon(greyIcon);
    }
  });
});

//end update status from MQTT Broker

var featureGroup = L.featureGroup(markers).addTo(map);
map.fitBounds(featureGroup.getBounds(), {
  padding: [100, 100],
});
//End map
function onMapClick(e) {
  console.log("click");
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
map.on("click", onMapClick);

//show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  console.log(showAlert);
}
//end show alert
