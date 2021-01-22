const Admin = require("../../models/admin");

module.exports = {
  createAdmin: async (args) => {
    const { email, password, username } = args.adminData;

    const checkErrors = Admin.validateAdminInput(email, password, username);
    if (checkErrors) return;

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
      message: "Account created successfully",
    };
  },

  loginAdmin: async (args) => {
    const { email, password } = args;
    const username = "username";
    const checkErrors = await Admin.validateAdminInput(
      email,
      password,
      username
    );
    if (checkErrors) return;

    const checkAdmin = await Admin.getAdminByEmail(email);

    if (!checkAdmin) {
      throw new Error("Username or password is invalid.");
    }

    const passwordMatch = await Admin.comparePassword(
      password,
      checkAdmin.password
    );

    if (!passwordMatch) {
      throw new Error("Username or Password is invalid.");
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
      username: checkAdmin.username,
      password: null,
      token,
      tokenExpired: 1,
      message: "Login successfully",
    };
  },
};
