const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    userType: {
      type: Number,
      required: false,
    },

    email: {
      type: String,
      minlength: 7,
      maxlength: 100,
      required: true,
    },

    phone: {
      type: String,
      maxlength: 11,
      minlength: 11,
      required: true,
    },

    benchmark: [
      {
        type: Number,
        required: true,
      },
    ],

    flag: {
      type: Boolean,
      default: true,
      required: true,
    },
  })
);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(11).max(11).required(),
    userType: Joi.number().min(0).max(1),
    email: Joi.string().regex(
      /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    username: Joi.string().required(),
    password: Joi.string().required(),
    _id: Joi.objectId(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
