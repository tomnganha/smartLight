const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/report.controller");

router.get("/:id", controller.index);
router.post("/:id", controller.indexPost);
module.exports = router;
