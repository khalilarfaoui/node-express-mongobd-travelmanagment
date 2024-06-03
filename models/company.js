const mongoose = require("mongoose");

const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: String }
  })
);

module.exports = Company;
