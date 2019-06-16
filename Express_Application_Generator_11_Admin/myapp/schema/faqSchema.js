var mongoose = require('mongoose');

var Schema = mongoose.Schema

var faq_schema = new Schema({
    faq_question: String,
    faq_answer: String
});

// faq_type_id: Number,
// faq_isStatus: Boolean

module.exports = mongoose.model(('faq'), faq_schema);