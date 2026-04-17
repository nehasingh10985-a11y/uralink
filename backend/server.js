const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8"]);
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/research", require("./routes/research"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} ✅`);
});
