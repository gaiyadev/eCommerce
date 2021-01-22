const Product = require("../../models/product");
const { dateToString } = require("../../helpers/date");

module.exports = {
  // ADD NEW PRODUCT
  addProduct: async (args, req, res) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request");
    }

    const { name, price, sku, color, image } = args.productData;
    if (!name) throw new Error("Name is required");
    if (!price) throw new Error("Price is required");
    if (!color) throw new Error("Color is required");
    if (!sku) throw new Error("Sku Number is required");
    if (!image) throw new Error("Image is required");

    const newProduct = Product({
      name: name,
      price: price,
      color: color,
      sku: sku,
      image: image,
      addedBy: req.userId,
    });

    const savedProduct = await Product.addProduct(newProduct);
    if (!savedProduct) return;

    return {
      _id: savedProduct._id,
      name: savedProduct.name,
      color: savedProduct.color,
      price: savedProduct.price,
      sku: savedProduct.sku,
      image: savedProduct.image,
      addedBy: savedProduct.addedBy,
      message: "Product added Successfully",
    };
  },
  // FETCH ALL PRODUCT
  allProduct: async () => {
    try {
      const product = await Product.allProduct();
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (err) {
      throw err;
    }
  },
  // GET A ALL PRODUCT CREATED BY A SINGLE ADMIN
  adminProduct: async ({ adminId }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request");
    }

    try {
      const product = await Product.find({ addedBy: adminId });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (err) {
      throw err;
    }
  },
  // GET A PRODUCT BY ID
  getProductById: async ({ productId }) => {
    try {
      const product = await Product.getProductById(productId);
      if (!product) {
        throw new Error("Product not found.");
      }
      return [product];
    } catch (err) {
      throw err;
    }
  },
  // UPDATE A PRODUCT BY ID
  updateProductById: async ({ productId, productData }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request");
    }
    const { name, price, sku, color, image } = productData;

    const savedProduct = await Product.updateProduct({
      productId: productId,
      name: name,
      price: price,
      sku: sku,
      color: color,
      image: image,
    });

    if (!savedProduct) {
      throw new Error("Product not found.");
    }
    return {
      _id: savedProduct._id,
      name: savedProduct.name,
      color: savedProduct.color,
      price: savedProduct.price,
      sku: savedProduct.sku,
      image: savedProduct.image,
      addedBy: savedProduct.addedBy,
      createdAt: dateToString(savedProduct.createdAt),
      updatedAt: dateToString(savedProduct.updatedAt),
      message: "Product updated Successfully",
    };
  },
  // DELETE A PRODUCT BY ID
  deleteProductById: async ({ productId }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated request");
    }

    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new Error("Unable to delete product successfully.");
      }
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        color: product.color,
        sku: product.sku,
        image: product.image,
        addedBy: product.addedBy,
        createdAt: dateToString(product.createdAt),
        updatedAt: dateToString(product.updatedAt),
        message: "Product delete successfully",
      };
    } catch (err) {
      throw err;
    }
  },
};
