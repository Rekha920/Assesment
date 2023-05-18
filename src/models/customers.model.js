const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is invalid']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        trim: true,
        max: 10,
        min: 10
    }
});

module.exports.CustomerModel = model("Customer", schema);