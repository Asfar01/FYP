const mongoose = require("mongoose");

const Task = mongoose.model(
  "task",
  new mongoose.Schema({
    task_id: {
      type: String,
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Completed"],
      default: "Pending",
    },
    type: {
      type: String,
      enum: ["PrimeNumber", "Linear Regression", "Image"],
      default: "PrimeNumber",
    }
  })
);

exports.Task = Task;
