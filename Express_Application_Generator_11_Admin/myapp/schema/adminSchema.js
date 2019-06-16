var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var admin_schema = new Schema({
    admin_email: String,
    admin_password: String
});

module.exports = mongoose.model(('admin'), admin_schema);