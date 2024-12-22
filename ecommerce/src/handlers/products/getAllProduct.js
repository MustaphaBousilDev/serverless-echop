// src/handlers/product/getAllProduct.js

const { getAllProductsService } = require('../../services/productService');

module.exports.getAllProduct = async () => {
  try {
    const products = await getAllProductsService();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Products fetched successfully!', products }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: 'Error fetching products', error: error.message }),
    };
  }
};
