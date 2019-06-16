var express = require('express');
var router = express.Router();

var countrySchemaModel = require('../schema/countrySchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET Country Page. */
router.get('/addCountry', function (req, res, next) {
    res.render('Country/addCountry');
});

/* POST Country Page. */
router.post('/addCountry', function (req, res, next) {
    const countrySchemaBodyData = {
        country_name: req.body.country_name
    };

    var data = countrySchemaModel(countrySchemaBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
            res.render('Country/addCountry');
        }
        else {
            console.log(req.body);
            res.render('Country/addCountry');
        }
    });
});

/*Display table of Country. */
router.get('/displayCountry', function (req, res) {
    countrySchemaModel.find(function (err, country) {
        if (err)
            console.log(err);
        else
            res.render('Country/display_country', { countries: country });
    });
});

/*Get Delete Page of Country */
router.get('/deleteCountry/:id', function (req, res, next) {
    countrySchemaModel.findByIdAndRemove(req.params.id, function (err, country) {
        if (err) {
            console.log(err);
            res.redirect('../displayCountry');
        }
        else
            res.redirect('../displayCountry');
    });
});

/*Shows Single Country Data */
router.get('/showCountry/:id', function (req, res, next) {
    countrySchemaModel.findById(req.params.id, function (err, country) {
        if (err)
            console.log(err);
        else {
            console.log(country);
            res.render('Country/show_country', { countries: country });
        }
    });
});

/*Get Edit Page of Country. */
router.get('/editCountry/:id', function (req, res) {
    console.log(req.params.id);
    countrySchemaModel.findById(req.params.id, function (err, country) {
        if (err)
            console.log(err);
        else
            console.log(country);
        res.render('Country/edit_country', { countries: country });
    });
});

/*Post Edit Page of Country */
router.post('/editCountry/:id', function (req, res) {
    const countrySchemaBodyData = {
        country_name: req.body.country_name
    };

    countrySchemaModel.findByIdAndUpdate(req.params.id, countrySchemaBodyData, function (err) {
        if (err)
            res.redirect('Country/editCountry/' + req.params.id);
        else
            res.redirect('../displayCountry');
    });
});

module.exports = router;