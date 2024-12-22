// src/utils/validation.js

module.exports.validateProductData = (data) => {
    const { title, price, description, imgKey } = data;
    const errors = [];
  
    if (!title || title.length < 3) errors.push('Title is required and should be at least 3 characters');
    if (typeof price !== 'number' || price <= 0) errors.push('Price must be a positive number');
    if (!description || description.length < 10) errors.push('Description must be at least 10 characters');
    if (!imgKey || imgKey.length < 3) errors.push('Image key is required');
  
    return errors;
  };
  