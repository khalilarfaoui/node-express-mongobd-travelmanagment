const mongoose = require("mongoose");

const traceStationSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  temps: { type: Number, required: true },
  ordre: { type: Number, required: true },
  distance: { type: Number, required: true },
});

const traceSchema = new mongoose.Schema({
  voyage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voyage",
    required: true,
  },
  stations: [traceStationSchema],
  tempsTotal: { type: Number, required: true },
  distanceTotal: { type: Number, required: true },
});

const Trace = mongoose.model("Trace", traceSchema);

module.exports = Trace;
