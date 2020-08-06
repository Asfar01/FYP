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
    senderName:{
      type: String,
      required: true
    },
    senderWalletKey:{
      type: String,
      required: true
    },
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recipientName:{
      type: String,
      required: true
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
    },
    cost: {
      type: Number,
      required: true,
      default: 0
    },
    value: {
      type: String,
      required: true
    }
  })
);

exports.Task = Task;
