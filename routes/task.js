const express = require("express");
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
    const { id, task_id } = req.body;
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
    users = _.filter(users, function (user) {
      return !(user in busy_);
    });

    let userBenchmarkList = [];

    for (let i = 0; i < users.length; i++) {
      const thisUser = await User.findById(id);
      const user = await User.findOne({ _id: users[i]._id });
      if (user && thisUser.email !== user.email) {
        userBenchmarkList.push({
          clientId: users[i].clientId,
          userId: user._id,
          benchmark: user.benchmark[user.benchmark.length - 1],
        });
      }
    }

    if (!userBenchmarkList.length) {
      return res
        .status(200)
        .send({ err: "No users online to serve your task, sad :(" });
    }
    bestBenchmark = min(userBenchmarkList);
    try {
      task = new Task({
        task_id: task_id,
        sender_id: id,
        recipient_id: bestBenchmark.userId,
        status: "Pending",
      });
      await task.save();
      console.log(task);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send(e.message);
    }
    return await res.status(200).send({ nodeKey: bestBenchmark.clientId });
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
    const task_id = req.body;
    console.log(task_id);
    let task = await Task.findOneAndUpdate(
      task_id,
      {
        status: "Completed",
      },
      { new: true, omitUndefined: true }
    );
    console.log(task);
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
