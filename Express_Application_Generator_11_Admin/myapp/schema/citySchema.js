var mongoose = require('mongoose');

var Schema = mongoose.Schema

var city_schema = new Schema({
    city_name: String,
    _state:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state'
    }
});

// city_isStatus: Boolean

module.exports = mongoose.model(('city'), city_schema);