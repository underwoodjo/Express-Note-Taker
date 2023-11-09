const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Get Routes to the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
// GET request for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);
// GET request for api/notes
app.get('/api/notes', (req, res) => {
  const file = './db/db.json';
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Failed to read notes from the file.' });
    } else {
      const note = JSON.parse(data);
      res.json(note);
    }
  });
});

  // POST request to add a note
// app.post('/api/notes', (req, res) => {


// Listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
