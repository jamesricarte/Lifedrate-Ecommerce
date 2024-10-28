const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {},
    age: {}
})

moodule.exports = mongoose.model('Product', productSchema);