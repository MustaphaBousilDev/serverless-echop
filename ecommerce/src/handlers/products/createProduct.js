// src/handlers/product/createProduct.js

const { createProductService } = require('../../services/productService');
const { validateProductData } = require('../../utils/validation');
const { productCreatedEvent } = require('../../events/productEvent');

module.exports.createProduct = async (event) => {
  const { title, price, description, imgKey, userId } = JSON.parse(event.body);

  // Validate product data
  const validationErrors = validateProductData({ title, price, description, imgKey });
  if (validationErrors.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Validation failed', errors: validationErrors }),
    };
  }

  try {
    const product = await createProductService({ title, price, description, imgKey, userId });

    // After the product is created, trigger an event
    const productEvent = productCreatedEvent(product);
    
    // Here you can trigger an event (e.g., using EventBridge, SNS, etc. - code omitted for brevity)
    // Example: await eventBridge.putEvents({ Entries: [productEvent] }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Product created successfully!', product }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating product', error: error.message }),
    };
  }
};
