var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user_schema = new Schema({
    user_fname: String,
    user_lname: String,
    user_name: String,
    user_email: String,
    user_password: String,
    user_address: String,
    _country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country'
    },
    _state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state'
    },
    _city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    },
    _area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'area'
    },
    user_pincode: String,
    user_mobile: String,
    user_dob: String,
    user_image: String,
    user_gender: String,
});

// user_dor:date
// user_isStatus: String

module.exports = mongoose.model(('users'), user_schema);