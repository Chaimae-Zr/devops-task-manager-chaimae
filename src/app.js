const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const tasksRouter = require('./routes/tasks');

const isTest = process.env.NODE_ENV === 'test';

if (!isTest) {
  mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API running' });
});

app.use('/tasks', tasksRouter);

if (require.main === module) {
  app.listen(3000, () => {
    console.log('API running on port 3000');
  });
}

module.exports = app;