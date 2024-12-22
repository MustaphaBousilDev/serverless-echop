// src/config/dynamoDB.js

const AWS = require('aws-sdk');

// You can set region or other configurations here, or get from environment variables
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamodb };
