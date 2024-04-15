const { Schema, model } = require('mongoose');

const TagModel = require("./Tag");
const shippingSchema = require('./Shipping');

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        purchased: {
            type: Number,
        },
        price: {
            type: Number,
        },
        condition: {
            type: String,
        },
        shipping_properties: shippingSchema,
        
        tag: [TagModel]
    }
);

module.exports = productSchema;