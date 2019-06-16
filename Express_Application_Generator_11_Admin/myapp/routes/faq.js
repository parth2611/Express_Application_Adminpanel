var express = require('express');
var router = express.Router();

var faqSchemaModel = require('../schema/faqSchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET Faq Page. */
router.get('/addFaq', function (req, res, next) {
    res.render('Faq/addFaq');
});

/* POST Faq Page. */
router.post('/addFaq', function (req, res, next) {
    const faqSchemaBodyData = {
        faq_question: req.body.faq_question,
        faq_answer: req.body.faq_answer
    }

    var data = faqSchemaModel(faqSchemaBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
            res.render('Faq/addFaq');
        }
        else {
            console.log(faqSchemaBodyData);
            res.render('Faq/addFaq');
        }
    });
});

/*Display Table of Admin */
router.get('/displayFaq', function (req, res) {
    faqSchemaModel.find(function (err, faq) {
        if (err)
            console.log(err);
        else
            res.render('Faq/display_faq', { faqs: faq });
    });
});

/*Get Delete Page of FAQ */
router.get('/deleteFaq/:id', function (req, res, next) {
    faqSchemaModel.findByIdAndRemove(req.params.id, function (err, faq) {
        if (err) {
            console.log(err);
            res.redirect('../displayFaq');
        }
        else
            res.redirect('../displayFaq');
    });
});

/*Shows Single Category Data */
router.get('/showFaq/:id', function (req, res, next) {
    faqSchemaModel.findById(req.params.id, function (err, faq) {
        if (err)
            console.log(err);
        else {
            console.log(faq);
            res.render('Faq/show_faq', { faqs: faq });
        }
    });
});

/*Get Edit Page of Category. */
router.get('/editFaq/:id', function (req, res) {
    console.log(req.params.id);
    faqSchemaModel.findById(req.params.id, function (err, faq) {
        if (err)
            console.log(err);
        else
            console.log(faq);
        res.render('Faq/edit_faq', { faqs: faq });
    });
});

/*Post Edit Page of FAQ */
router.post('/editFaq/:id', function (req, res) {
    const faqSchemaBodyData = {
        faq_question: req.body.faq_question,
        faq_answer: req.body.faq_answer
    }

    faqSchemaModel.findByIdAndUpdate(req.params.id, faqSchemaBodyData, function (err) {
        if (err)
            res.redirect('Faq/editFaq/' + req.params.id);
        else
            res.redirect('../displayFaq');
    });
});

module.exports = router;