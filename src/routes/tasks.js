const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL ||
'mongodb://localhost:27017/tasksdb');
// Define schema
const Task = mongoose.model('Task', new mongoose.Schema({
id: Number,
title: String,
completed: Boolean
}));
// GET all tasks
router.get('/', async (req, res) => {
const tasks = await Task.find({}, { _id: 0, __v: 0 });
res.json(tasks);
});
// POST new task
router.post('/', async (req, res) => {
const count = await Task.countDocuments();
const task = new Task({ id: count + 1, ...req.body });
await task.save();
res.status(201).json(task);
});
module.exports = router;
