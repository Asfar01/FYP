const express = require("express");
var extrap = require("extrapolate");
const router = express.Router();
const _ = require("lodash");
const { Wallet } = require("../models/Wallet");
const OnlineUsers = require("../onlineUser");
const BusyUsers = require("../busyUsers");
const { User } = require("../models/User");
const { Task } = require("../models/Task");
const { io } = require("../app");

const { identity } = require("lodash");

router.post("/uploadTask", async (req, res) => {
  try {
    const { id, task_id, data } = req.body;
    // If the user has enough sikay
    let wallets = await Wallet.find({ user_id: id, flag: true });
    if (!wallets.length) return res.status(404).send("You have no wallet");
    for (let i = 0; i < wallets.length; i++) {
      if (wallets[i].balance > 50) {
        break;
      }
      if (i == wallets.length - 1) {
        return res.status(202).send("You don't have enough sikay");
      }
    }

    // Online users
    var onlineUsers = new OnlineUsers();
    var busyUsers = new BusyUsers();

    console.log("online_", onlineUsers.get());
    let users = _.values(onlineUsers.get());
    let busy_ = _.values(busyUsers.get());

    // filtering the busy users
    users = _.differenceWith(users, busy_, _.isEqual);

    let userBenchmarkList = [];

    for (let i = 0; i < users.length; i++) {
      const thisUser = await User.findById(id);
      const user = await User.findOne({ _id: users[i]._id });
      console.log("extrapolater:", user.extrapolater);
      if (user && thisUser.email !== user.email) {
        userBenchmarkList.push({
          clientId: users[i].clientId,
          userId: user._id,
          firstName: user.name.firstName,
          benchmark: user.benchmark[user.benchmark.length - 1],
          extrapolater: user.extrapolater,
        });
      }
    }

    if (!userBenchmarkList.length) {
      return res
        .status(299)
        .send({ err: "No users online to serve your task, sad :(" });
    }
    const thisUser = await User.findById(id);
    bestBenchmark = min(userBenchmarkList);
    const value =
      data.type == "PrimeNumber"
        ? {
            prime: { number: data.number },
          }
        : { linear: { x: data.number.x, y: data.number.y } };
    try {
      task = new Task({
        task_id: task_id,
        sender_id: id,
        senderName: thisUser.name.firstName,
        senderWalletKey: data.swKey,
        recipient_id: bestBenchmark.userId,
        recipientName: bestBenchmark.firstName,
        status: "Pending",
        type: data.type,
        value: data.number,
      });
      await task.save();
      console.log(task);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send(e.message);
    }
    return await res
      .status(200)
      .send({ nodeKey: bestBenchmark.clientId, task_id: task_id });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

const min = (items) => {
  let min = items[0];
  for (let i = 0; i < items.length; i++) {
    if (items[i].benchmark < min.benchmark) {
      min = items[i];
    }
  }
  return min;
};

router.put("/taskUpdate", async (req, res) => {
  try {
    const { task_id, status } = req.body;
    console.log(task_id, status);
    if (status == "Completed") {
      let task = await Task.findOneAndUpdate(
        { task_id },
        {
          status: status,
          cost: 20,
        },
        { new: true, omitUndefined: true }
      );
      res.status(200).send(task);
    } else {
      let task = await Task.findOneAndUpdate(
        { task_id },
        {
          status: status,
        },
        { new: true, omitUndefined: true }
      );
      res.status(200).send(task);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

/* GET User Tasks. */
router.get("/userTasks/:user_id", async (req, res) => {
  try {
    console.log("user Id: ", req.params);
    const { user_id } = req.params;
    let Tasks = [];
    Tasks[0] = await Task.find({ sender_id: user_id });
    // console.log("Sender task is ", Tasks);

    Tasks[1] = await Task.find({ recipient_id: user_id });
    // console.log("Receiver task is ", Tasks);

    res.status(200).send(Tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
