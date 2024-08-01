const express = require('express');
const path = require('path');
const app = express();
const sim = require('./sim');
const teach = require('./teach');

// Serve static HTML file for the main site
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/sim', sim);
app.use('/teach', teach);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
