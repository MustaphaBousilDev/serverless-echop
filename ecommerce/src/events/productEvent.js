// src/events/productEvent.js

module.exports.productCreatedEvent = (product) => {
    return {
      source: 'ecommerce.product',
      detailType: 'ProductCreated',
      detail: JSON.stringify(product),
      time: new Date().toISOString(),
      resources: [],
    };
  };
  
  module.exports.productUpdatedEvent = (product) => {
    return {
      source: 'ecommerce.product',
      detailType: 'ProductUpdated',
      detail: JSON.stringify(product),
      time: new Date().toISOString(),
      resources: [],
    };
  };
  