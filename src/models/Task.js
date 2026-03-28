const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed: Boolean
});

module.exports = mongoose.model('Task', taskSchema);