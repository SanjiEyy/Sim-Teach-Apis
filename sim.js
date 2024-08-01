const express = require('express');
const cors = require('cors'); // Import the cors package
const router = express.Router();
const fs = require('fs');
const path = './sim.json'; // Path to the sim.json file

// Use the cors middleware
router.use(cors());

router.get('/', async (req, res) => {
  try {
    // Read the JSON data from the file
    let data = JSON.parse(fs.readFileSync(path, 'utf8'));
    let ask = req.query.ask;

    // Check if the query exists in the data
    if (!data[ask]) {
      return res.json({ respond: "I don't know what you're saying. Please teach me." });
    }

    // Select a random response from the list of responses
    let response = data[ask][Math.floor(Math.random() * data[ask].length)];
    res.json({ respond: response });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.json({ respond: "An error occurred. Please try again later." });
  }
});

module.exports = router;
