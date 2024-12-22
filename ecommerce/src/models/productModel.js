const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const PRODUCTS_TABLE_NAME = process.env.PRODUCTS_TABLE_NAME;

module.exports.ProductModel = {
  create: async ({ title, price, description, imgKey, productsId }) => {
    const productId = new Date().toISOString(); // unique ID based on timestamp

    const params = {
      TableName: 'products',
      Item: {
        productsId,
        title,
        price,
        description,
        imgKey,
        userId: "100", // Relating the product to a user
        createdAt: new Date().toISOString()
      }
    };

    try {
      await dynamodb.put(params).promise();
      return params.Item;
    } catch (error) {
      throw new Error('Error creating product: ' + error.message);
    }
  },

  update: async (productsId, { title, price, description, imgKey }) => {
    const params = {
      TableName: 'products',
      Key: { productsId },
      UpdateExpression: 'SET title = :title, price = :price, description = :description, imgKey = :imgKey',
      ExpressionAttributeValues: {
        ':title': title,
        ':price': price,
        ':description': description,
        ':imgKey': imgKey
      },
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamodb.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    }
  },

  delete: async (productsId) => {
    const params = {
      TableName: 'products',
      Key: { productsId }
    };

    try {
      await dynamodb.delete(params).promise();
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    }
  },

  getAll: async () => {
    const params = {
      TableName: 'products'
    };

    try {
      const result = await dynamodb.scan(params).promise();
      return result.Items;
    } catch (error) {
      throw new Error('Error fetching products: ' + error.message);
    }
  }
};
