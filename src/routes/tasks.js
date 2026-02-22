const express = require('express');
const router = express.Router();

// Tasks data
const tasks = [
  {id: 1, title: "Learn Git", completed: false},
  {id: 2, title: "Practice DevOps", completed: true}
];

// GET /tasks route
router.get('/', (req, res) => {
  res.json(tasks);
});

module.exports = router;