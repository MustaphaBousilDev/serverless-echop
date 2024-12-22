const { ProductModel } = require('../models/productModel'); // Adjusted path for model import

module.exports.createProductService = async ({ title, price, description, imgKey, productsId }) => {
  return await ProductModel.create({ title, price, description, imgKey, productsId });
};

module.exports.updateProductService = async (productsId, { title, price, description, imgKey }) => {
  return await ProductModel.update(productsId, { title, price, description, imgKey });
};

module.exports.deleteProductService = async (productsId) => {
  return await ProductModel.delete(productsId);
};

module.exports.getAllProductService = async () => {
  return await ProductModel.getAll();
};
