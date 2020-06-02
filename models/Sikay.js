const mongoose = require("mongoose");

const Sikay = mongoose.model(
    "sikay",
    new mongoose.Schema({
      index: {
          required: true,
          type: Number
      },
      timestamp: {
          required: true,
          type: Date,
          default: Date.now()
      },
      transactions: {
          required: true,
          type: Array
      },
      nonce: {
          required: true,
          type: Number
      },
      hash: {
          require: true,
          type: String
      },
      previousHash: {
          required: false,
          type: String
      }
    })
  );

  exports.Sikay = Sikay;