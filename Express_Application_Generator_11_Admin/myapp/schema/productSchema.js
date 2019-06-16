var mongoose = require('mongoose');

var Schema = mongoose.Schema

var product_schema = new Schema({
    product_name: String,
    product_description: String,
    product_price: String,
    product_quantity: String,
    product_image: String,
    _subcategory:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    }
});

// product_isStatus: Boolean

module.exports = mongoose.model('product', product_schema);