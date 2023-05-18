const { CartModel } = require("../models/cart.model");

const getCartList = async (req, res) => {
    try {
        let { limit, page, sort } = req.query;
        limit = Number(limit);
        page = Number(page);
        sort = Number(sort);

        if (!limit) limit = 10;
        if (!page) page = 1;
        if (!sort) sort = 1;

        let skip = (page - 1) * 10;
        const cart = await CartModel.find().sort({ _id: sort }).skip(skip).limit(limit);
        const total = await CartModel.count();
        return res.status(200).send({
            error: false,
            message: "success",
            response: { cart, total }
        });
    } catch (error) {
        console.error(error);
    }
}

const addCart = async (req, res) => {
    try {
        let data = await CartModel.create(req.body);
        return res.status(200).send({
            error: false,
            message: "card added successfully",
            response: data
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { addCart, getCartList };