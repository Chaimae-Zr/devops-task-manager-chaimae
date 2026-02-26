const express = require('express');
const app = express();
app.use(express.json());

const tasksRouter = require('./routes/tasks');

app.get('/', (req, res) => {

  res.json({ message: "Welcome from FEATURE branch" });

});

app.use('/tasks', tasksRouter);

// CI test change
console.log("Testing CI with a Pull Request"); 

app.listen(3000, () => console.log("API running on port 3000"));
