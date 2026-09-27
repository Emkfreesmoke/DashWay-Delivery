const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

// ===============================
// ADMIN DASHBOARD
// ===============================
router.get("/", adminController.getAdminDashboard);

// ===============================
// CREATE SHIPMENT
// ===============================
router.get("/create-shipment", adminController.getCreateShipment);

router.post("/create-shipment", adminController.createShipment);

// ===============================
// SHIPMENT HISTORY
// ===============================
router.get("/history", adminController.getHistory);

// ===============================
// SHIPMENT DETAILS
// ===============================
router.get("/shipment/:id", adminController.getShipmentDetails);

// ===============================
// UPDATE SHIPMENT
// ===============================
router.post("/shipment/:id/update", adminController.updateShipment);

// ===============================
// DELETE ONE SHIPMENT
// ===============================
router.post("/shipment/:id/delete", adminController.deleteShipment);

// ===============================
// DELETE ALL HISTORY
// ===============================
router.post("/history/delete-all", adminController.deleteShipmentHistory);

module.exports = router;
