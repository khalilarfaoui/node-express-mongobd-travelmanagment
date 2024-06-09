const mongoose = require("mongoose");
const Station = require("../models/station"); 
const Company = require("../models/company"); 

const voyageSchema = new mongoose.Schema({
  name : { type: String},
  stationDepart: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  stationArrive: { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  prix: { type: Number, required: true },
  distance: { type: Number, required: true },
  dateDepart: { type: Date, required: true },
  dateArrive: { type: Date, required: true },
});

const Voyage = mongoose.model("Voyage", voyageSchema);

module.exports = Voyage;