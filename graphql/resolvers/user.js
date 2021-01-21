const { body, validationResult, check } = require("express-validator");
const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    const { email, password, username } = args.userData;
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 chars long");
    }
    if (!username) {
      throw new Error("Username is required");
    }
    if (username.length < 4) {
      throw new Error("Username must be at least 4 chars long");
    }

    const checkUser = await User.getUserByEmail(email);
    console.log(checkUser);
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
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }

    const checkUser = await User.getUserByEmail(email);
    if (!checkUser) {
      throw new Error("Username or password is invalid.");
    }

    const passwordMatch = await User.comparePassword(
      password,
      checkUser.password
    );

    if (!passwordMatch) {
      throw new Error("Username or password is invalid.");
    }

    const token = await User.generateToken(
      checkUser.email,
      checkUser._id,
      email.username
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
