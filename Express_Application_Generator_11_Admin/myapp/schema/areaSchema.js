var mongoose = require('mongoose');

var Schema = mongoose.Schema

var area_schema = new Schema({
    area_name: String,
    _city:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    }
});

// area_isStatus: Boolean

module.exports = mongoose.model(('area'), area_schema);