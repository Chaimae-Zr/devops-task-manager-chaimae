const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const isTest = process.env.NODE_ENV === 'test';

let testTasks = [
  { id: 1, title: 'Learn Git', completed: false },
  { id: 2, title: 'Practice DevOps', completed: true }
];

// GET /tasks
router.get('/', async (req, res) => {
  if (isTest) {
    return res.json(testTasks);
  }

  try {
    const tasks = await Task.find({}, { _id: 0, __v: 0 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  if (isTest) {
    const newTask = {
      id: testTasks.length + 1,
      title: req.body.title,
      completed: req.body.completed ?? false
    };

    testTasks.push(newTask);
    return res.status(201).json(newTask);
  }

  try {
    const count = await Task.countDocuments();
    const task = new Task({
      id: count + 1,
      title: req.body.title,
      completed: req.body.completed ?? false
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

module.exports = router;
