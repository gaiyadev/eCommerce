const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    const { email, password, username } = args.userData;

    const checkErrors = await User.validateUserInput(email, password, username);
    if (checkErrors) return;

    const checkUser = await User.getUserByEmail(email);
    if (checkUser) {
      throw new Error("User with the same email already exist.");
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
      message: "Account created successfully",
    };
  },
  // LOGIN USER
  loginUser: async (args) => {
    const { email, password } = args.userLoginData;
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
      username: checkUser.username,
      password: null,
      token: token,
      tokenExpired: 1,
      message: "Login successfully",
    };
  },
  // USER CHANGE PASSWORD
  changePassword: async ({ userId, changePassword }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized request");
    }
    const { password, new_password, confirm_password } = changePassword;

    const checkErrors = await User.validatePasswordInput(
      password,
      new_password,
      confirm_password
    );
    if (checkErrors) return;

    const checkUser = await User.getUserById(userId);
    if (!checkUser) {
      throw new Error("invalid user id.");
    }

    const matchPassword = await User.comparePassword(
      password,
      checkUser.password
    );
    if (!matchPassword) {
      throw new Error("Current password is not correct");
    }
    if (new_password !== confirm_password) {
      throw new Error("New password is not equal to confirm password");
    }

    const newPassCheck = await User.comparePassword(
      new_password,
      checkUser.password
    );

    if (newPassCheck) {
      throw new Error(
        "New password can not be the same with the current password"
      );
    }
    const savedPassword = await User.updatePassword(new_password, userId);
    if (!savedPassword) {
      throw new Error("New error");
    }
    return {
      _id: savedPassword._id,
      username: savedPassword.username,
      email: savedPassword.email,
      password: null,
      message: "User password updated successfully",
    };
  },
  // USER CHANGE PROFILE
  changeProfile: async ({ userId, userProfile }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized request");
    }
    const { email, username } = userProfile;

    const checkErrors = await User.validateProfileInput(email, username);
    if (checkErrors) return;

    const checkUser = await User.getUserByEmail(email);
    if (checkUser) {
      throw new Error("User with the same email already exist.");
    }

    const user = await User.updateUserProfile(userId, email, username);
    if (!user) {
      throw new Error("Soemthing went wrong.");
    }
    return {
      _id: user._id,
      username: user.username,
      password: null,
      email: user.email,
      message: "User profile updated successfully",
    };
  },
  getUser: async ({ userId }) => {
    try {
      const user = await User.getUserById(userId);
      if (!user) return;
      return [user];
    } catch (e) {
      console.log(e);
    }
  },
};
