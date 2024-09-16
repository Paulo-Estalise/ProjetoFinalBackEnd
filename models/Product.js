const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    category: String,
    thumbnails: [String],
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
