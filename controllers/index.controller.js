const express = require("express");
const router = express.Router();
const Shipment = require("../models/Shipment");

const indexController = require("../controllers/index.controller");

const getHomePage = (req, res) => {
  const services = [
    {
      title: "Air Freight",
      description:
        "Fast and reliable air-freight solutions for time-sensitive shipments.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85&auto=format&fit=crop",
    },

    {
      title: "Sea/Ocean Freight",
      description:
        "Cost-effective ocean shipping for bulk and containerized cargo.",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=85&auto=format&fit=crop",
    },

    {
      title: "Road Transportation",
      description:
        "Flexible road freight networks for dependable regional delivery.",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=85&auto=format&fit=crop",
    },

    {
      title: "Warehousing",
      description:
        "Secure storage and professional warehouse solutions for your goods.",
      image:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=900&q=85&auto=format&fit=crop",
    },

    {
      title: "Packaging & Storage",
      description:
        "Professional packaging and storage designed to protect your shipments.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85&auto=format&fit=crop",
    },

    {
      title: "Diplomatic Services",
      description:
        "Secure logistics and specialized handling for sensitive documents and valuables.",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=900&q=85&auto=format&fit=crop",
    },
  ];
  res.render("index", { services });
};
const getAboutPage = (req, res) => {
  res.render("about", {
    title: "About Us - DashWayDelivery",
  });
};

const getContactPage = (req, res) => {
  res.render("contact", {
    title: "Contact Us - DashWayDelivery",
  });
};
const getServicePage = (req, res) => {
  res.render("service", {
    title: "services - DashWayDelivery",
  });
};

const trackShipment = async (req, res) => {
  try {
    const trackingNumber = req.query.trackingNumber?.trim();

    if (!trackingNumber) {
      return res.render("track-shipment", {
        title: "Track Shipment - DashWayDelivery",
        shipment: null,
      });
    }

    const shipment = await Shipment.findOne({
      trackingNumber: trackingNumber.toUpperCase(),
    });

    if (!shipment) {
      return res.render("track-shipment", {
        title: "Track Shipment - DashWayDelivery",
        shipment: null,
        trackingError:
          "Invalid tracking number. Please check your tracking ID and try again.",
      });
    }

    res.render("track-shipment", {
      title: `Track ${shipment.trackingNumber} - DashWayDelivery`,
      shipment,
    });
  } catch (error) {
    console.error("Error tracking shipment:", error);
    res.status(500).send("Unable to track shipment.");
  }
};

module.exports = {
  getHomePage,
  getAboutPage,
  getContactPage,
  getServicePage,
  trackShipment,
};
