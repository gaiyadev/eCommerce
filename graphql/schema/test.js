const userSchema = require("../schema/user");
const productSchema = require("../schema/product");
const adminSchema = require("../schema/admin");
// USELESS

const rootSchema = {
  ...userSchema,
  ...productSchema,
  ...adminSchema,
};

module.exports = rootSchema;
