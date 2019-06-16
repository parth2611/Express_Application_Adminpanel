var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var subcategory_schema = new Schema({
    subcategory_name: String,
    subcategory_description: String,
    subcategory_image: String,
    _category:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
});

// subcategory_isStatus

module.exports = mongoose.model(('subcategory'), subcategory_schema);