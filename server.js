const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
console.log("loaded mongo_uri:", process.env.MONGO_URI);
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

// Database Connection
MONGO_URI =
  "mongodb://wemzycool_db_user:omnipd2026@cluster0-shard-00-00.tpy7od1.mongodb.net:27017,cluster0-shard-00-01.tpy7od1.mongodb.net:27017,cluster0-shard-00-02.tpy7od1.mongodb.net:27017/dashway_db?ssl=true&replicaSet=atlas-13p5o3-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);

// Server Listener
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
