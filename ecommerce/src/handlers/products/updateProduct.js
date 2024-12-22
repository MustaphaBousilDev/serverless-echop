// src/handlers/product/updateProduct.js

const { updateProductService } = require('../../services/productService');
const { validateProductData } = require('../../utils/validation');

module.exports.updateProduct = async (event) => {
  const { id } = event.pathParameters;
  const { title, price, description, imgKey } = JSON.parse(event.body);

  // Validate product data
  const validationErrors = validateProductData({ title, price, description, imgKey });
  if (validationErrors.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Validation failed', errors: validationErrors }),
    };
  }

  try {
    const updatedProduct = await updateProductService(id, { title, price, description, imgKey });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Product updated successfully!', product: updatedProduct }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: 'Error updating product', error: error.message }),
    };
  }
};
