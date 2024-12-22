// src/handlers/product/deleteProduct.js

const { deleteProductService } = require('../../services/productService');

module.exports.deleteProduct = async (event) => {
  const { id } = event.pathParameters;

  try {
    await deleteProductService(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Product deleted successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: 'Error deleting product', error: error.message }),
    };
  }
};
