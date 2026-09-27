const Shipment = require("../models/Shipment");

const getAdminDashboard = async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });

    const totalShipments = shipments.length;

    const pendingShipments = shipments.filter(
      (shipment) => shipment.status === "Pending",
    ).length;

    const inTransitShipments = shipments.filter(
      (shipment) =>
        shipment.status === "In Transit" ||
        shipment.status === "Picked Up" ||
        shipment.status === "Out for Delivery",
    ).length;

    const deliveredShipments = shipments.filter(
      (shipment) => shipment.status === "Delivered",
    ).length;

    const cancelledShipments = shipments.filter(
      (shipment) => shipment.status === "Cancelled",
    ).length;

    const recentShipments = shipments.slice(0, 5);

    let selectedShipment = null;

    if (req.query.shipmentId) {
      selectedShipment = await Shipment.findById(req.query.shipmentId);
    }

    res.render("admin/dashboard", {
      title: "Admin Dashboard | DashWay",

      shipments,
      recentShipments,

      totalShipments,
      pendingShipments,
      inTransitShipments,
      deliveredShipments,
      cancelledShipments,

      selectedShipment,
    });
  } catch (error) {
    console.error("Error loading admin dashboard:", error);

    res.status(500).send("Unable to load admin dashboard.");
  }
};

// ===============================
// CREATE SHIPMENT PAGE
// ===============================
const getCreateShipment = (req, res) => {
  res.render("admin/create-shipment", {
    title: "Create Shipment | DashWay",
  });
};

// ===============================
// CREATE NEW SHIPMENT
// ===============================
const createShipment = async (req, res) => {
  try {
    const {
      status,
      senderName,
      senderEmail,
      senderPhone,
      senderAddress,

      receiverName,
      receiverEmail,
      receiverPhone,
      receiverAddress,

      origin,
      destination,

      shipmentType,
      packageType,
      weight,
      quantity,
      estimatedDelivery,

      orderDetails,
      adminNotes,
    } = req.body;

    // Generate tracking number automatically.
    // Admin does NOT enter or choose the tracking number.
    const trackingNumber = await Shipment.generateTrackingNumber();

    const initialStatus = status || "Pending";

    const shipment = new Shipment({
      trackingNumber,
      status: initialStatus,

      statusHistory: [
        {
          status: initialStatus,
          location: "",
          date: new Date(),
        },
      ],
      senderName,
      senderEmail,
      senderPhone,
      senderAddress,

      receiverName,
      receiverEmail,
      receiverPhone,
      receiverAddress,

      origin,
      destination,

      shipmentType,
      packageType,
      weight,
      quantity,

      estimatedDelivery,

      orderDetails,
      adminNotes,
    });

    await shipment.save();

    console.log(`Shipment created successfully: ${trackingNumber}`);

    res.redirect(`/admin/shipment/${shipment._id}`);
  } catch (error) {
    console.error("Error creating shipment:", error);

    res.status(500).send("Unable to create shipment. Please try again.");
  }
};

// ===============================
// VIEW SINGLE SHIPMENT
// ===============================
const getShipmentDetails = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).send("Shipment not found.");
    }

    res.render("admin/shipment-details", {
      title: `Shipment ${shipment.trackingNumber} | DashWay`,
      shipment,
    });
  } catch (error) {
    console.error("Error loading shipment details:", error);

    res.status(500).send("Unable to load shipment details.");
  }
};
// update shipment
const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).send("Shipment not found.");
    }

    const newStatus = req.body.status;
    const newLocation = req.body.currentLocation;

    // Update current shipment information
    shipment.status = newStatus;

    if (newLocation !== undefined) {
      shipment.currentLocation = newLocation;
    }

    if (req.body.destination !== undefined) {
      shipment.destination = req.body.destination;
    }

    if (req.body.estimatedDelivery) {
      shipment.estimatedDelivery = req.body.estimatedDelivery;
    }

    // Only create a history entry when the status actually changes
    if (
      shipment.statusHistory.length === 0 ||
      shipment.statusHistory[shipment.statusHistory.length - 1].status !==
        newStatus
    ) {
      shipment.statusHistory.push({
        status: newStatus,
        location: newLocation || shipment.currentLocation || "",
        date: new Date(),
      });
    }

    await shipment.save();

    res.redirect(`/admin/shipment/${shipment._id}`);
  } catch (error) {
    console.error("Error updating shipment:", error);
    res.status(500).send("Unable to update shipment.");
  }
};
// const updateShipment = async (req, res) => {
//   try {
//     const shipment = await Shipment.findById(req.params.id);

//     if (!shipment) {
//       return res.status(404).send("Shipment not found.");
//     }

//     shipment.currentLocation = req.body.currentLocation;
//     shipment.status = req.body.status;
//     shipment.destination = req.body.destination;
//     shipment.estimatedDelivery = req.body.estimatedDelivery || null;

//     await shipment.save();

//     res.redirect("/admin");
//   } catch (error) {
//     console.error("Error updating shipment:", error);

//     res.status(500).send("Unable to update shipment.");
//   }
// };

// ===============================
// DELETE ONE SHIPMENT
// ===============================
const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).send("Shipment not found.");
    }

    await Shipment.findByIdAndDelete(req.params.id);

    console.log(`Shipment deleted: ${shipment.trackingNumber}`);

    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting shipment:", error);

    res.status(500).send("Unable to delete shipment.");
  }
};

// ===============================
// DELETE ALL SHIPMENT HISTORY
// ===============================
const deleteShipmentHistory = async (req, res) => {
  try {
    await Shipment.deleteMany({});

    console.log("All shipment history deleted.");

    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting shipment history:", error);

    res.status(500).send("Unable to delete shipment history.");
  }
};
// ===============================
// SHIPMENT HISTORY
// ===============================
const getHistory = async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });

    res.render("admin/history", {
      title: "Order History | DashWay",
      shipments,
    });
  } catch (error) {
    console.error("Error loading shipment history:", error);

    res.status(500).send("Unable to load shipment history.");
  }
};

// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
  getAdminDashboard,
  getCreateShipment,
  createShipment,
  getHistory,
  getShipmentDetails,
  updateShipment,
  deleteShipment,
  deleteShipmentHistory,
};
