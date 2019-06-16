var mongoose = require('mongoose');

var Schema = mongoose.Schema

var country_schema = new Schema({
    country_name: String,
});

// country_isStatus: Boolean

module.exports = mongoose.model(('country'), country_schema);