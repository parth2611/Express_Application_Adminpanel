var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var category_schema = new Schema({
    category_name: String,
    category_description: String,
    category_image: String
});

// category_isStatus

module.exports = mongoose.model('category', category_schema);