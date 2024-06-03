const express = require("express");
const router = express.Router();
const Voyage = require("../models/voyage");

// Create a new voyage
router.post("/", async (req, res) => {
  try {
    const voyage = new Voyage(req.body);
    await voyage.save();
    res.status(201).send(voyage);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all voyages
router.get("/", async (req, res) => {
  try {
    const voyages = await Voyage.find().populate('stationDepart').populate('stationArrive').populate('company');
    res.status(200).send(voyages);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a voyage by ID
router.get("/:id", async (req, res) => {
  try {
    const voyage = await Voyage.findById(req.params.id).populate('stationDepart').populate('stationArrive').populate('company');
    if (!voyage) {
      return res.status(404).send();
    }
    res.status(200).send(voyage);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a voyage by ID
router.put("/:id", async (req, res) => {
  try {
    const voyage = await Voyage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!voyage) {
      return res.status(404).send();
    }
    res.status(200).send(voyage);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a voyage by ID
router.delete("/:id", async (req, res) => {
  try {
    const voyage = await Voyage.findByIdAndDelete(req.params.id);
    if (!voyage) {
      return res.status(404).send();
    }
    res.status(200).send(voyage);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
