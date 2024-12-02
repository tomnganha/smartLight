const express = require("express");
const controller = require("../../controllers/admin/schedule.controller");

const router = express.Router();
router.get("/", controller.schedule);
router.patch("/", controller.schedulePatch);
module.exports = router;
