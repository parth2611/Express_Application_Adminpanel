var mongoose = require('mongoose');

var Schema = mongoose.Schema

var state_schema = new Schema({
    state_name: String,
    _country:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country'
    }
});

// state_isStatus: Boolean

module.exports = mongoose.model(('state'), state_schema);