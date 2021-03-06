const mongoose = require("mongoose");
require("../database/db");
const Joi = require("joi");

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
    addedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Admin",
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

// FIND PRODUCT BY ID
module.exports.getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    throw err;
  }
};

// FETCH ALL PRODUCT
module.exports.allProduct = async () => {
  try {
    const product = await Product.find();
    if (!product) return;
    return product;
  } catch (err) {
    throw err;
  }
};

// UPDATE PRODUCT
module.exports.updateProduct = async ({
  productId,
  name,
  price,
  sku,
  color,
  image,
}) => {
  try {
    const product = await Product.findByIdAndUpdate(productId);
    if (!product) return;
    product.name = name;
    product.price = price;
    product.sku = sku;
    product.color = color;
    product.image = image;
    const savedProduct = await product.save();
    return savedProduct;
  } catch (err) {
    throw err;
  }
};

// VALIDATING PRODUCT INPUTS
module.exports.validateProductInput = (name, price, sku, color, image) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    price: Joi.string().min(2).max(11).required(),
    sku: Joi.string().min(2).max(255).required(),
    color: Joi.string().required(),
    image: Joi.required(),
  });

  const { error } = schema.validate({
    name: name,
    price: price,
    sku: sku,
    color: color,
    image: image,
  });

  if (error) {
    const errors = error.details[0].message;
    throw new Error(`${errors}`);
  }
};

// UPLOAD PRODUCT IMAGE
module.exports.uploadProductImage = async (image) => {};
