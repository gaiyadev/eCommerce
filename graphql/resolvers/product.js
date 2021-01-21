const Product = require("../../models/product");

module.exports = {
  addProduct: async (args) => {
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
    });

    const savedProduct = await Product.addProduct(newProduct);
    return {
      _id: savedProduct._id,
      name: savedProduct.name,
      color: savedProduct.color,
      price: savedProduct.price,
      sku: savedProduct.sku,
      image: savedProduct.image,
      message: "Product added Successfully",
    };
  },
  allProduct: async () => {
    try {
      const product = await Product.allProduct();
      if (!product) return;
      return product;
    } catch (err) {
      throw err;
    }
  },
};
