'use strict';

const DynamoDB = require('aws-sdk/clients/dynamodb');
const documentClient = new DynamoDB.DocumentClient({
  region: 'us-east-1',
  maxRetries: 3,
  httpOptions: {
    timeout: 5000, // Fix typo
  },
});

module.exports.createProduct = async (event) => {
  try {
    const data = JSON.parse(event.body); // Parse the request body
    if (!data.productsId || !data.title || !data.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: productsId, title, or body' }),
      };
    }

    const params = {
      TableName: 'products',
      Item: {
        productsId: data.productsId, // Match the table schema
        title: data.title,
        body: data.body,
      },
      ConditionExpression: 'attribute_not_exists(productsId)', // Prevent overwriting existing items
    };

    await documentClient.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'The product has been created' }),
    };
  } catch (err) {
    console.error('Error creating product:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create product', error: err.message }),
    };
  }
};

module.exports.updateProduct = async (event) => {
  try {
    const productId = event.pathParameters.id;
    const data = JSON.parse(event.body);

    const params = {
      TableName: 'products',
      Key: { productsId: productId },
      UpdateExpression: 'set title = :title, body = :body',
      ExpressionAttributeValues: {
        ':title': data.title,
        ':body': data.body,
      },
      ConditionExpression: 'attribute_exists(productsId)', // Ensure the product exists
    };

    await documentClient.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Product with ID ${productId} updated successfully` }),
    };
  } catch (err) {
    console.error('Error updating product:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update product', error: err.message }),
    };
  }
};

module.exports.deleteProduct = async (event) => {
  try {
    const productId = event.pathParameters.id;

    const params = {
      TableName: 'products',
      Key: { productsId: productId },
      ConditionExpression: 'attribute_exists(productsId)', // Ensure the product exists
    };

    await documentClient.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Product with ID ${productId} deleted successfully` }),
    };
  } catch (err) {
    console.error('Error deleting product:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete product', error: err.message }),
    };
  }
};

module.exports.getAllProducts = async () => {
  try {
    const params = {
      TableName: 'products',
    };

    const result = await documentClient.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.error('Error fetching products:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch products', error: err.message }),
    };
  }
};
