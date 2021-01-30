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

// VALIDATE USER PASSWORD
module.exports.validatePasswordInput = (
  password,
  new_password,
  confirm_password
) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(255).required(),
    new_password: Joi.string().min(6).max(255).required(),
    confirm_password: Joi.string().min(6).max(255).required(),
  });
  const { error } = schema.validate({
    password: password,
    new_password: new_password,
    confirm_password: confirm_password,
  });
  if (error) {
    const errors = error.details[0].message;
    throw new Error(`${errors}`);
  }
};

// VALIDATE USE PROFILE INPUT
module.exports.validateProfileInput = (email, username) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    username: Joi.string().min(4).max(11).required(),
  });
  const { error } = schema.validate({
    username: username,
    email: email,
  });
  if (error) {
    const errors = error.details[0].message;
    throw new Error(`${errors}`);
  }
};

// UPDATE USER DETAILS
module.exports.updateUserProfile = async (userId, email, username) => {
  try {
    const user = await User.findByIdAndUpdate(userId);
    if (!user) return;
    user.email = email;
    user.username = username;
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

// UODATE PASSWORD
module.exports.updatePassword = async (new_password, userId) => {
  try {
    const user = await User.findByIdAndUpdate(userId);
    if (!user) return;
    const hash = await bcrypt.hash(new_password, 12);
    user.password = hash; //set hash password
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};
