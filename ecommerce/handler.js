'use strict';

module.exports.createProduct = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify("A new Product created!")
  };
};

module.exports.updateProduct = async (event) => {
  let productId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify("update  Product with this id:" + productId)
  };
};
