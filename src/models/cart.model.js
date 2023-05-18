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
            ref: "Product"
        },
        qty: { type: Number, default: 1 },
    }]
}, {
    timestamps: true
});

module.exports.CartModel = model("cart", schema);