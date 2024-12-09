const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/mode.controller");

router.get("/", controller.index);
router.patch("/change-mode/:status/:data_mode", controller.indexPatch);
module.exports = router;
