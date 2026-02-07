const express = require("express");
const router = express.Router();
const warrantyController = require("../controllers/warranty.controller");

router.post("/", warrantyController.createWarranty);

module.exports = router;
