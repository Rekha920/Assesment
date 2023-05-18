const { Schema, model } = require('mongoose');

const schema = new Schema({
    "name": {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports.CategoryModel = model('Category', schema);