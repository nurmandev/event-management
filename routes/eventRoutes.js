const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEvent,
  getEventsUsers,
} = require("../controllers/eventController");

// Get a single events
router.get("/:id", getEvent);

// Create a new event with auth
router.post("/", auth, createEvent);

// Get all events for the authenticated user
router.get("/", getEventsUsers);

// Update a specific event
router.put("/:id", auth, updateEvent);

// Delete a specific event
router.delete("/:id", auth, deleteEvent);

module.exports = router;
