const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json());

let items = [];
const instanceId = process.env.INSTANCE_ID || uuidv4();

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: uuidv4(), name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

app.get('/api/stats', (req, res) => {
  res.json({ count: items.length, instanceId });
});

app.listen(3000, () => console.log('Backend running on 3000'));
