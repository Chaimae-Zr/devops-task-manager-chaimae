const express = require('express');
const app = express();
app.use(express.json());

const tasks = [
  { id: 1, title: "Learn DevOps (Modified for Lab 1)", completed: true },
  { id: 2, title: "Practice Git Branching", completed: false },
  { id: 3, title: "Complete Lab 1 Successfully", completed: false },
  { id: 4, title: "Push to GitHub", completed: true }
];

app.get('/', (req, res) => {
  res.json({ message:  "Welcome from MAIN branch" });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length+1, title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(3000, ()=> console.log("API running on port 3000"));
