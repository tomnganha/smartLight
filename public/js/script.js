//const cookieParser = require("cookie-parser");

var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,

  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
//var marker = L.marker([51.5, -0.09]).addTo(map);
//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup();

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
      `<ul>
      <li>title: ${item.title}</li>
      <li>Type: ${item.type}</li>
      </ul>
      <a href="#">details</a>
      <button>edit</button>`
    )
    .openPopup();
});
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
