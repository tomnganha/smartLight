const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/mode.controller");

router.get("/", controller.index);
router.patch(
  "/change-powerSavingMode/:status/:data_mode",
  controller.powerSavingModePatch
);
router.patch(
  "/change-autoLightMode/:status/:data_mode",
  controller.autoLightModePatch
);
router.patch("/change-brightness_normal", controller.brightnessModePatch);
module.exports = router;
