const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const Wallet = mongoose.model(
  "wallets",
  new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    publicKey : {
        type: String,
        required: true
    },

    privateKey : {
        type: String,
        required: true
    },

    balance : {
        type: Number,
        required: true,
        default: 100
    },

    flag: {
        type: Boolean,
        default: true,
        required: true,
      }
  })
);

// function validateUser(user) {
//   const schema = {
//     firstName: Joi.string().min(2).max(50).required(),
//     lastName: Joi.string().min(2).max(50).required(),
//     phone: Joi.string().min(11).max(11).required(),
//     email: Joi.string().regex(
//       /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     ),
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//     _id: Joi.objectId(),
//   };

//   return Joi.validate(user, schema);
// }

exports.Wallet = Wallet;
//exports.validate = validateUser;
