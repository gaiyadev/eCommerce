const mongoose = require("mongoose");
require("../database/db");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

// CREATE A NEW PRODUCT
module.exports.addProduct = async (newProduct) => {
  try {
    return await newProduct.save();
  } catch (err) {
    throw err;
  }
};

// FIND USER BY ID
module.exports.getProductById = async (id) => {
  try {
    const productId = await Product.findById(id);
    return productId;
  } catch (err) {
    throw err;
  }
};

module.exports.allProduct = async () => {
  try {
    const product = await Product.find();
    if (!product) return;
    return product;
  } catch (err) {
    throw err;
  }
};
