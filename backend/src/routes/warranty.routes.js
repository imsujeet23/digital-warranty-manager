const express = require("express");
const router = express.Router();
const warrantyController = require("../controllers/warranty.controller");

router.get("/", warrantyController.getWarranties);
router.post("/", warrantyController.createWarranty);

module.exports = router;
