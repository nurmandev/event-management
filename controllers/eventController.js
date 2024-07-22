const mongoose = require("mongoose");
const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    events,
    color,
    tag,
    metadata,
    duration,
    startTime,
    endTime,
    creationTime,
    creationUser,
  } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      events,
      color,
      tag,
      metadata,
      duration,
      startTime,
      endTime,
      creationTime,
      creationUser,
      user: req.user.id,
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid event id" });
  }

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No event found" });
  }

  res.status(200).json(event);
};

exports.getEventsUsers = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, time } = req.body;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.time = time;

    event = await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    // Validate the event ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid event ID" });
    }

    // Find the event by ID
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if the user is authorized to delete the event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Remove the event
    await event.deleteOne();
    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
