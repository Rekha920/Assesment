const { CartModel } = require("../models/cart.model");

const createOrder = async (req, res) => {
    try {
        const userId = req.query.userId;
        const data = await CartModel.findOne({ userId: userId }).populate("items.productId");
        return res.status(200).send({
            error: false,
            message: "Order create successfully",
            response: data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

module.exports = { createOrder }