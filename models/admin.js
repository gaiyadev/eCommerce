const mongoose = require("mongoose");
require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema(
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

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;

// CREATE A NEW USER
module.exports.newAdmin = async (newAdmin) => {
  try {
    const hash = await bcrypt.hash(newAdmin.password, 12);
    newAdmin.password = hash; //set hash password
    return await newAdmin.save();
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
module.exports.getAdminByEmail = async (email) => {
  const query = {
    email: email,
  };
  try {
    return await Admin.findOne(query);
  } catch (err) {
    throw err;
  }
};

// FIND USER BY ID
module.exports.getAdminById = async (id) => {
  try {
    const userId = await Admin.findById(id);
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
