const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/devices.controller");

const validates = require("../../validates/admin/device.validate");

router.get("/", controller.devices);
router.patch("/change-status/:status/:id/:title", controller.changeStatus);
router.delete("/delete/:id", controller.deleteItem);
router.get("/create", controller.createItem);
router.post("/create", validates.createPost, controller.createItemPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", validates.createPost, controller.editPatch);
router.get("/details/:id", controller.details);
module.exports = router;
