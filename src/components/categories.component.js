const { CategoryModel } = require("../models/categories.model");


const getAllCategory = async (req, res) => {
    try {
        const data = await CategoryModel.find();
        return res.status(200).send({
            error: false,
            message: 'success',
            response: data
        });
    } catch (error) {
        console.error(error);
    }
}

const getSingleCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ _id: req.params.id })
        return res.status(200).send({
            error: false,
            message: "success",
            response: category
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getAllCategory, getSingleCategory }