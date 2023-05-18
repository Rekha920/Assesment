const { userModel } = require("../models/user.modal");

const getUserList = async (req, res) => {
    try {
        const data = await userModel.find();
        const total = await userModel.count()
        return res.status(200).send({
            error: false,
            message: 'success',
            response: { data, total }
        });
    } catch (error) {
        console.error(error);
    }
}

const addUser = async (req, res) => {
    try {
        const data = await userModel.create(req.body);
        return res.status(200).send({
            error: false,
            message: 'user add successfully',
            response: data
        });
    } catch (error) {
        console.error(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const data = await userModel.updateOne(
            { name: req.body.name },
            { $set: req.body }
        );
        return res.status(200).send({
            error: false,
            message: 'user successfully updated!',
            response: data
        });
    } catch (error) {
        console.error(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const data = await userModel.deleteOne({ _id: req.params.id })
        return res.status(200).send({
            error: false,
            message: 'user succesfully deleted!',
            response: data
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUserList, addUser, updateUser, deleteUser };