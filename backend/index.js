const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json());

let items = [];
const instanceId = process.env.INSTANCE_ID || uuidv4();
const startTime = Date.now();
let requestCount = 0;

// Middleware zliczający żądania
app.use((req, res, next) => {
  requestCount++;
  next();
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const item = { id: uuidv4(), name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.floor((Date.now() - startTime) / 1000)
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    count: items.length,
    instanceId,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    requestCount,
    serverTime: new Date().toISOString()
  });
});

app.listen(3000, () => console.log('Backend running on 3000'));
