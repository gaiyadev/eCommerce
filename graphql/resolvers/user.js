const { body, validationResult, check } = require("express-validator");
const User = require("../../models/user");
const Joi = require("joi");

module.exports = {
  createUser: async (args) => {
    const { email, password, username } = args.userData;

    const checkErrors = await User.validateUserInput(email, password, username);
    if (checkErrors) return;

    const checkUser = await User.getUserByEmail(email);
    if (checkUser) {
      throw new Error("User already exist.");
    }
    //create a User
    const newUser = User({
      email: email,
      password: password,
      username: username,
    });
    const savedUser = await User.newUser(newUser);
    return {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      password: null,
      message: "Account created Successfully",
    };
  },

  loginUser: async (args) => {
    const { email, password } = args;
    const username = "username";

    const checkErrors = await User.validateUserInput(email, password, username);
    if (checkErrors) return;

    const checkUser = await User.getUserByEmail(email);
    if (!checkUser) {
      throw new Error("Username or Password is invalid.");
    }

    const passwordMatch = await User.comparePassword(
      password,
      checkUser.password
    );

    if (!passwordMatch) {
      throw new Error("Username or Password is invalid.");
    }

    const token = await User.generateToken(
      checkUser._id,
      checkUser.email,
      checkUser.username
    );

    if (!token) return;
    return {
      _id: checkUser._id,
      email: checkUser.email,
      password: null,
      username: checkUser.username,
      token,
      tokenExpired: 1,
      message: "Login Successfully",
    };
  },
};
