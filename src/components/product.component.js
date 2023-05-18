const { default: mongoose } = require("mongoose");
const { ProductModel } = require("../models/product.model");

const getProductList = async (req, res) => {
  try {
    let search = req.query;
    let { limit, page, sort } = req.query;
    limit = Number(limit);
    page = Number(page);
    sort = Number(sort);

    if (!limit) limit = 10;
    if (!page) page = 1;
    if (!sort) sort = 1;

    let skip = (page - 1) * limit;

    const list = await ProductModel.find(search).select({ __v: 0 }).populate("category").sort({ brand: sort }).skip(skip).limit(limit);
    const total = await ProductModel.count();
    return res.status(200).send({
      error: false,
      message: "success",
      response: { list, total },
    });
  } catch (error) {
    console.error(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, brand, price, category } = req.body;
    if (!name) return res.status(400).send({ error: true, message: "name is required!", response: null });
    if (!brand) return res.status(400).send({ error: true, message: "brand is required!", response: null });
    if (!category) return res.status(400).send({ error: true, message: "category is required!", response: null });
    if (!price) return res.status(400).send({ error: true, message: "price is required!", response: null });

    const data = await ProductModel.create({ name, brand, category, price });
    return res.status(200).send({
      error: false,
      message: "product successfully added",
      response: data,
    });
  } catch (e) {
    console.error(e);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { _id, name, brand, price, category } = req.body;

    if (!mongoose.isValidObjectId(_id))
      return res.status(200).send({
        error: true,
        message: "Product _id is invalid.",
        response: null,
      });
    const getProduct = await ProductModel.findById(_id);
    if (name) getProduct.name = name;
    if (brand) getProduct.brand = brand;
    if (category) getProduct.category = category;
    if (price) getProduct.price = price;

    const data = await getProduct.save();
    return res.status(200).send({
      error: false,
      message: "product successfully update!",
      response: data,
    });
  } catch (e) {
    console.error(e);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const data = await ProductModel.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).send({
      error: false,
      message: "product successfully deleted!",
      response: data,
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const data = await ProductModel.findOne({ _id: req.params.id }).populate("category");
    return res.status(200).send({
      error: false,
      message: "success",
      response: data,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
