const User = require('./User');
const Tag = require("./Tag");
const productSchema = require("./Product");

// User model contains collectionSchema
// productSchema contains shippingSchema and Tag model
// collectionSchema contains productSchema 

module.exports = { User, Tag, productSchema};
