const express = require('express');
const cors = require('cors'); // Import the cors package
const router = express.Router();
const fs = require('fs');
const path = './sim.json';

// Use the cors middleware
router.use(cors());

router.get('/', async (req, res) => {
  let ask = req.query.ask;
  let ans = req.query.ans;
  if (!ask || !ans) return res.json({ err: "Missing 'ask' or 'ans' query!" });

  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
  let data = JSON.parse(fs.readFileSync(path));

  if (!data[ask]) data[ask] = [];
  data[ask].push(ans);
  fs.writeFileSync(path, JSON.stringify(data, null, 4));

  res.json({ ask: ask, ans: ans });
});

module.exports = router;
