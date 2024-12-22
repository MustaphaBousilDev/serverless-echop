const { ProductModel } = require('../models/productModel'); // Adjusted path for model import

module.exports.createProductService = async ({ title, price, description, imgKey, userId }) => {
  return await ProductModel.create({ title, price, description, imgKey, userId });
};

module.exports.updateProductService = async (productId, { title, price, description, imgKey }) => {
  return await ProductModel.update(productId, { title, price, description, imgKey });
};

module.exports.deleteProductService = async (productId) => {
  return await ProductModel.delete(productId);
};

module.exports.getAllProductService = async () => {
  return await ProductModel.getAll();
};
