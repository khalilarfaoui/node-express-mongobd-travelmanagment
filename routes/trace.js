const express = require('express');
const router = express.Router();
const Trace = require('../models/trace');

// Get all traces
router.get('/', async (req, res) => {
  try {
    const traces = await Trace.find().populate('voyage stations.station');
    res.status(200).json(traces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single trace by ID
router.get('/:id', async (req, res) => {
  try {
    const trace = await Trace.findById(req.params.id).populate('voyage stations.station');
    if (trace == null) {
      return res.status(404).json({ message: 'Trace not found' });
    }
    res.status(200).json(trace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new trace
router.post('/', async (req, res) => {
  console.log(req.body)
  const trace = new Trace({
    voyage: req.body.voyage,
    stations: req.body.stations,
    tempsTotal: req.body.tempsTotal,
    distanceTotal: req.body.distanceTotal
  });

  try {
    const newTrace = await trace.save();
    res.status(201).json(newTrace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing trace
router.put('/:id', async (req, res) => {
  try {
    const trace = await Trace.findById(req.params.id);
    if (trace == null) {
      return res.status(404).json({ message: 'Trace not found' });
    }

    if (req.body.voyage != null) {
      trace.voyage = req.body.voyage;
    }
    if (req.body.stations != null) {
      trace.stations = req.body.stations;
    }
    if (req.body.tempsTotal != null) {
      trace.tempsTotal = req.body.tempsTotal;
    }
    if (req.body.distanceTotal != null) {
      trace.distanceTotal = req.body.distanceTotal;
    }

    const updatedTrace = await trace.save();
    res.status(200).json(updatedTrace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a trace
router.delete('/:id', async (req, res) => {
  try {
    const trace = await Trace.findByIdAndDelete(req.params.id);
    if (!trace) {
      return res.status(404).send();
    }
    res.status(200).send(trace);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
