var express = require("express");
var router = express.Router();
const extrap = require("extrapolate");
const { User } = require("../models/User");
const { Wallet } = require("../models/Wallet");
var extrapolate = new extrap();

//Update Benchmark
router.post("/:id/upBench", async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {

    extrapolate.given(1, score[0]);
    extrapolate.given(2, score[1]);
    extrapolate.given(3, score[2]);
    extrapolate.given(4, score[3]);
    extrapolate.given(5, score[4]);

    let user = await User.findByIdAndUpdate(id, {
      $push: { benchmark: score },
      extrapolater: extrapolate
    });
    user = await User.findById(id);
    const wallet = await Wallet.findOne({id})
    if(wallet)
    res.status(201).send(user, wallet);
    else res.status(201).send(user);
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
