const express = require("express");
const router = express.Router();
const Trace = require("../models/trace");

// Créer une nouvelle trace (Create)
router.post("/", async (req, res) => {
  try {
    const newTrace = new Trace(req.body);
    const savedTrace = await newTrace.save();
    res.status(201).json(savedTrace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lire toutes les traces (Read all)
router.get("/", async (req, res) => {
  try {
    const traces = await Trace.find().populate('stations.station');
    res.status(200).json(traces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une trace spécifique par ID (Read one)
router.get("/:id", async (req, res) => {
  try {
    const trace = await Trace.findById(req.params.id).populate('stations.station');
    if (!trace) return res.status(404).json({ message: "Trace not found" });
    res.status(200).json(trace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour une trace (Update)
router.put("/:id", async (req, res) => {
  try {
    const updatedTrace = await Trace.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTrace) return res.status(404).json({ message: "Trace not found" });
    res.status(200).json(updatedTrace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer une trace (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const deletedTrace = await Trace.findByIdAndDelete(req.params.id);
    if (!deletedTrace) return res.status(404).json({ message: "Trace not found" });
    res.status(200).json({ message: "Trace deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
