const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const isTest = process.env.NODE_ENV === 'test';

let testTasks = [
  { id: 1, title: "Learn Git", completed: false },
  { id: 2, title: "Practice DevOps", completed: true }
];

// GET /tasks
router.get('/', async (req, res) => {
  if (isTest) {
    return res.json(testTasks);
  }

  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  if (isTest) {
    const { title, completed } = req.body;

    const newTask = {
      id: testTasks.length + 1,
      title,
      completed: completed ?? false
    };

    testTasks.push(newTask);
    return res.status(201).json(newTask);
  }

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