const Device = require("../../models/device.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const mqttConfig = require("../../config/mqtt.config");
const mongoose = require("mongoose");

const systemConfig = require("../../config/systems");
//[GET] /admin/devices
module.exports.devices = async (req, res) => {
  ///phan bo loc
  const filterStatus = filterStatusHelper(req.query);

  let find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }
  /////het phan bo loc

  //tim kiem
  let objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //het tim kiem
  //PHAN TRANG
  const countDevices = await Device.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countDevices
  );
  //HET PHAN TRANG

  const devices = await Device.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/devices/index", {
    titlePage: "Devices",
    devices: devices,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

//[PATCH] /admin/devices/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  // let light = await Device.findOne({ _id: req.params.id });
  // console.log(light);
  const client = mqttConfig.client;
  let data = { [req.params.title]: req.params.status };
  data = JSON.stringify(data);
  console.log(data);
  console.log(typeof data);
  client.publish(_PUBLISH_TOPIC, data, (error) => {
    if (error) {
      console.error(error);
    }
  });

  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Device.updateOne({ _id: id }, { status: status });
  req.flash("success", "Status updated successfully");
  res.redirect("back");
};

//[DELETE] /admin/devices/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Device.deleteOne({ _id: id });
  res.redirect("back");
};

///[GET] /admin/devices/create
module.exports.createItem = async (req, res) => {
  res.render("admin/pages/devices/create", { titlePage: "Create item" });
};
///[POST] /admin/devices/create
function generateRandomId() {
  return Math.random().toString(36).substr(2, 9); // Tạo chuỗi 9 ký tự ngẫu nhiên
}
///[POST] /admin/devices/create
module.exports.createItemPost = async (req, res) => {
  if (!req.body.title) {
    req.flash("error", "Please enter a title");
    res.redirect("back");
    return;
  }
  console.log(req.body);
  // req.body.latitude = mongoose.Types.Decimal128.fromString(req.body.latitude);
  // req.body.longitude = mongoose.Types.Decimal128.fromString(req.body.longitude);

  req.body = {
    _id: generateRandomId(),
    ...req.body,
    location: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    status: "off",
    brightness_level: 100,
  };
  console.log(req.body);
  const device = new Device(req.body);
  await device.save();
  console.log(req.body);
  res.redirect(`${systemConfig.prefixAdmin}/devices`);
};
//[GET] /admin/edit/:id
function covertFormatDate(date) {
  let newFormatDate = date.toISOString().split("T")[0];
  let year = newFormatDate.split("-")[0];
  let month = newFormatDate.split("-")[1];
  let day = newFormatDate.split("-")[2];
}
module.exports.edit = async (req, res) => {
  try {
    const find = { _id: req.params.id };
    var device = await Device.findOne(find);
    console.log("device: ", device);
    let installation_date = device.installation_date
      .toISOString()
      .split("T")[0];
    let last_maintenance = device.last_maintenance.toISOString().split("T")[0];
    let longitude = device.location.longitude.toString();
    let latitude = device.location.latitude.toString();
    res.render("admin/pages/devices/edit", {
      titlePage: "Edit device",
      device: device,
      last_maintenance: last_maintenance,
      installation_date: installation_date,
      longitude: longitude,
      latitude: latitude,
    });
  } catch (error) {
    //res.redirect(`${systemConfig.prefixAdmin}/devices`);
  }
};
//[PATCH] admin/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.latitude = mongoose.Types.Decimal128.fromString(req.body.latitude);
  req.body.longitude = mongoose.Types.Decimal128.fromString(req.body.longitude);
  req.body = {
    ...req.body,
    //_id: req.params.id,
    status: "off",
    brightness_level: 100,
  };
  
  try {
    await Device.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "updated successfully");
    res.redirect(`${systemConfig.prefixAdmin}/devices`);
  } catch (error) {
    console.log("error");
    res.redirect("back");
  }
};
//[GET] /admin/details/:id
module.exports.details = async (req, res) => {
  const find = {
    _id: req.params.id,
  };

  const device = await Device.findOne(find);
  console.log(device);
  res.render("admin/pages/devices/details", {
    titlePage: "Detail device",
    device: device,
    installation_date: "1/1/2020",
  });
};
