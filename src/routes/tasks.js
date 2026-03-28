const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const { title, completed } = req.body;

    const newTask = new Task({
      title,
      completed: completed ?? false
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

module.exports = router;