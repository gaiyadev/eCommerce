const Admin = require("../../models/admin");

module.exports = {
  createAdmin: async (args) => {
    const { email, password, username } = args.adminData;
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

    const checkAdmin = await Admin.getAdminByEmail(email);
    if (checkAdmin) {
      throw new Error("Admin already exist.");
    }
    //create a User
    const newAdmin = Admin({
      email: email,
      password: password,
      username: username,
    });
    const savedAdmin = await Admin.newAdmin(newAdmin);
    return {
      _id: savedAdmin._id,
      email: savedAdmin.email,
      username: savedAdmin.username,
      password: null,
      message: "Account created Successfully",
    };
  },

  loginAdmin: async (args) => {
    const { email, password } = args;
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }

    const checkAdmin = await Admin.getAdminByEmail(email);
    if (!checkAdmin) {
      throw new Error("Username or password is invalid.");
    }

    const passwordMatch = await Admin.comparePassword(
      password,
      checkAdmin.password
    );

    if (!passwordMatch) {
      throw new Error("Username or password is invalid.");
    }

    const token = await Admin.generateToken(
      checkAdmin._id,
      checkAdmin.email,
      checkAdmin.username
    );

    if (!token) return;
    return {
      _id: checkAdmin._id,
      email: checkAdmin.email,
      password: null,
      username: checkAdmin.username,
      token,
      tokenExpired: 1,
      message: "Login Successfully",
    };
  },
};
