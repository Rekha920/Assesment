const { Schema, model } = require("mongoose");

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        unique: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        qty: { type: Number, required: true, default: 1 },
        price: {
            total_price: {
                type: Number,
                required: true
            },
        }
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    },
    address: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports.OrderModel = model('Order', schema);