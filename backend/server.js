// backend/server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.get('/vehicle-location', (req, res) => {
  fs.readFile('vehicle-data.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      const vehicleData = JSON.parse(data);
      res.json({ path: vehicleData });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
