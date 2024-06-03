const express = require("express");
const router = express.Router();
const Station = require("../models/station");

// Create a new station
router.post("/", async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).send(station);
  } catch (error) {
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        res.status(400).send({ error: `${field} already exists` });
    } else {
        res.status(400).send(error);
    }
}
});

// Get all stations
router.get("/", async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).send(stations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single station by id
router.get("/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).send();
    }
    res.status(200).send(station);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a station by id
router.patch("/:id", async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!station) {
      return res.status(404).send();
    }
    res.status(200).send(station);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a station by id
router.delete("/:id", async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).send();
    }
    res.status(200).send(station);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
