const express = require("express");
const router = express.Router();
const Voyage = require("../models/voyage");
const Station = require("../models/station");
async function findNameStationByID(id) {
  try {
    const station = await Station.findById(id);
    if (!station) {
      throw new Error('Station not found');
    }
    return station.name;
  } catch (error) {
    throw new Error(`Error finding station: ${error.message}`);
  }
}

// Create a new voyage
router.post('/', async (req, res) => {
  try {
    const voyage = new Voyage(req.body);
    const stationDepartName = await findNameStationByID(voyage.stationDepart);
    const stationArriveName = await findNameStationByID(voyage.stationArrive);
    voyage.name = `${new Date().getTime()} ${stationDepartName} > ${stationArriveName}`;
    await voyage.save();
    res.status(201).send(voyage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all voyages
router.get("/", async (req, res) => {
  try {
    const voyages = await Voyage.find()
      .populate("stationDepart")
      .populate("stationArrive")
      .populate("company");
    res.status(200).send(voyages);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a voyage by ID
router.get("/:id", async (req, res) => {
  try {
    const voyage = await Voyage.findById(req.params.id)
      .populate("stationDepart")
      .populate("stationArrive")
      .populate("company");
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
    const voyage = await Voyage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
