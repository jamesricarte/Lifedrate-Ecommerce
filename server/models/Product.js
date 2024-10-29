const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {},
    age: {}
})

module.exports = mongoose.model('Product', productSchema);