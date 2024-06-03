const mongoose = require("mongoose");
const stationSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  lag: { type: String },
  lat: { type: String },
  adresse: { type: String, unique: true },
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
