const Product = require("../../models/product");
const { dateToString } = require("../../helpers/date");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/products");
  },
  filename: (req, file, cb) => {
    let pic = file.originalname;
    cb(null, pic);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, //10mb
  },
  fileFilter: (req, file, cb) => {
    // allow images only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      console.log("Only image are allowed.");
    }
    cb(null, true);
  },
});

module.exports = {
  // ADD NEW PRODUCT
  addProduct: async (args, req, res) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized request");
    }

    const { name, price, sku, color, image } = args.productData;

    const checkErrors = await Product.validateProductInput(
      name,
      price,
      sku,
      color,
      image
    );
    if (checkErrors) return;

    //file upload

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
      message: "Product added successfully",
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
      throw new Error("Unauthorized request");
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
      throw new Error("Unauthorized request");
    }
    const { name, price, sku, color, image } = productData;

    const checkErrors = Product.validateProductInput(
      name,
      price,
      sku,
      color,
      image
    );
    if (checkErrors) return;

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
      message: "Product updated successfully",
    };
  },
  // DELETE A PRODUCT BY ID
  deleteProductById: async ({ productId }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized request");
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
