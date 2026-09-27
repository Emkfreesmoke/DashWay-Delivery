const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    // Automatically generated tracking number
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    // Shipment status

    status: {
      type: String,
      enum: [
        "Pending",
        "Picked Up",
        "In Transit",
        "Arrives Airport",
        "Package departed",
        "Arrived country of destination",
        "Awaiting Custom Clearance",
        "Custom Clearance",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // Sender information
    senderName: {
      type: String,
      required: true,
      trim: true,
    },

    senderEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    senderPhone: {
      type: String,
      required: true,
      trim: true,
    },

    senderAddress: {
      type: String,
      required: true,
      trim: true,
    },

    // Receiver information
    receiverName: {
      type: String,
      required: true,
      trim: true,
    },

    receiverEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    receiverPhone: {
      type: String,
      required: true,
      trim: true,
    },

    receiverAddress: {
      type: String,
      required: true,
      trim: true,
    },

    // Shipment information
    origin: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },
    currentLocation: {
      type: String,
      trim: true,
      default: "",
    },

    shipmentType: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: String,
      trim: true,
    },

    estimatedDelivery: {
      type: Date,
    },

    // This is the new field you requested
    orderDetails: {
      type: String,
      trim: true,
    },

    // Admin can store additional notes
    adminNotes: {
      type: String,
      trim: true,
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Generate a random DashWay tracking number
shipmentSchema.statics.generateTrackingNumber = async function () {
  let trackingNumber;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);

    trackingNumber = `DW${randomNumber}`;

    exists = await this.exists({
      trackingNumber,
    });
  }

  return trackingNumber;
};

module.exports = mongoose.model("Shipment", shipmentSchema);
