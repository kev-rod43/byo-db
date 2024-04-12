const {Schema, model} = require ("mongoose");

const shippingSchema = new Schema (
    {
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        depth: {
            type: Number,
        },
        weight: {
            type: Number,
        }
    }
);

module.exports = shippingSchema;