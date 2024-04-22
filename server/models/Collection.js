const {Schema, model} = require("mongoose");

const productSchema = require("./Product");

const collectionSchema = new Schema(
    {
        collection_name: {
            type: String,
            required: true,
        },
        products: [productSchema],
    }
);

module.exports = collectionSchema;