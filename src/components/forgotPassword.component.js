const sendMailF = require("../config/email.config");
const { CustomerModel } = require("../models/customers.model");
const { v4: uuidv4 } = require('uuid');
const { ForgetPasswordTemplate } = require("../templates/forgetPassword.template");
const client = require("../config/radis.config");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send({ error: true, message: "email is required", response: null });
        const data = await CustomerModel.findOne({ email: email });
        const key = uuidv4();
        await client.setEx(key, 60 * 10, data._id.toString());

        {
            // send email
            sendMailF(data.email, 'Forget Password', ForgetPasswordTemplate(key, data.name))
        }

        return res.status(200).send({
            error: false,
            message: "email sent successfully",
            response: ""
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const emailVerify = async (req, res) => {
    try {
        const key = req.params.key;
        if (!key) return res.status(400).send({
            error: false,
            message: "key not found."
        });
        const _id = await client.get(key);
        if (!_id) return res.status(400).send({
            error: false,
            message: "invalid token."
        });
        await CustomerModel.findByIdAndUpdate({ _id }, { isVerified: true });
        const redirect_url = process.env.AFTER_EMAIL_VFY_REDIRECT_URL || '';
        if (!redirect_url)
            return res.status(200).send({
                error: false,
                message: "email verified!",
                data: null
            });
        return res.redirect(301, redirect_url);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { key, password, confirmPassword } = req.body;
        if (!key) return res.status(404).send({ error: true, message: "key is required", response: null });
        if (!password) return res.status(404).send({ error: true, message: "password is required", response: null });
        if (!confirmPassword) return res.status(404).send({ error: true, message: "Confirm password is required", response: null });
        const id = await client.get(key);
        if (!id) return res.status(403).send({ error: true, message: "Key expired!", response: null });
        await CustomerModel.findOneAndUpdate({ _id: id }, { $set: { password: password } });
        await client.del(key);
        return res.status(200).send({
            error: false,
            message: "Password successfully updated..",
            response: null
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: true,
            message: error.message
        });
    }
}

module.exports = { forgotPassword, resetPassword, emailVerify };