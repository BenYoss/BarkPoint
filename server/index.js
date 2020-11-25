require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || '8080';
const distPath = path.join(__dirname, '../client/dist');

app.use(express.json());
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.error(`http://localhost:${PORT}`);
});
