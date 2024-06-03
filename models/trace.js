const mongoose = require("mongoose");

const traceStationSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  temp: { type: String, required: true },
});

const traceSchema = new mongoose.Schema({
  voyage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voyage",
    required: true,
  },
  stations: [traceStationSchema],
});

const Trace = mongoose.model("Trace", traceSchema);

module.exports = Trace;
