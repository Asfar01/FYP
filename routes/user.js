var express = require("express");
var router = express.Router();
const { User } = require("../models/User");

//Update Benchmark
router.post("/:id/upBench", async (req, res) => {
  const { id } = req.params;
  const { benchmarkValue } = req.body;
  try {
    let user = await User.findByIdAndUpdate(id, { benchmark: benchmarkValue });
    user = await User.findById(id);
    res.status(201).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const user = await User.find().sort({ date: -1 });

    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
