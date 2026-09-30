const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");

router.get("/", indexController.getHomePage);
router.get("/about", indexController.getAboutPage);
router.get("/contact", indexController.getContactPage);
router.post("/contact", indexController.handleContactForm);
router.get("/service", indexController.getServicePage);

router.get("/track-shipment", indexController.trackShipment);

module.exports = router;
