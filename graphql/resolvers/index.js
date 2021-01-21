const userResolver = require("../resolvers/user");
const adminResolver = require("../resolvers/admin");
const productResolver = require("../resolvers/product");

const rootResolver = {
  ...userResolver,
  ...adminResolver,
  ...productResolver
};

module.exports = rootResolver;
