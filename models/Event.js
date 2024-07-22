const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  events: String,
  tag: String,
  color: String,
  duration: String,
  metadata: String,
  startTime: String,
  endTime: String,
  creationTime: String,
  creationUser: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Event", EventSchema);
