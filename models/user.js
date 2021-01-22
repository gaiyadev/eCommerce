const mongoose = require("mongoose");
require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

// CREATE A NEW USER
module.exports.newUser = async (newUser) => {
  try {
    const hash = await bcrypt.hash(newUser.password, 12);
    newUser.password = hash; //set hash password
    return await newUser.save(); //create New User
  } catch (err) {
    throw err;
  }
};

// COMPARE USER PASSWORD
module.exports.comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw err;
  }
};

// FIND USER BY THE EMAIL
module.exports.getUserByEmail = async (email) => {
  const query = {
    email: email,
  };
  try {
    return await User.findOne(query);
  } catch (err) {
    throw err;
  }
};

// FIND USER BY ID
module.exports.getUserById = async (id) => {
  try {
    const userId = await User.findById(id);
    return userId;
  } catch (err) {
    throw err;
  }
};

// GENERATE JWT AUTH TOKEN
module.exports.generateToken = async (_id, email, username) => {
  try {
    const token = await jwt.sign(
      {
        _id: _id,
        email: email,
        username: username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports.validateUserInput = (email, password, username) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    username: Joi.string().min(4).max(11).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  const { error } = schema.validate({
    username: username,
    email: email,
    password: password,
  });
  if (error) {
    const errors = error.details[0].message;
    throw new Error(`${errors}`);
  }
};



