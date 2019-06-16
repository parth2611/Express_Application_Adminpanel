var express = require('express');
var router = express.Router();

var citySchemaModel = require('../schema/citySchema');
var stateSchemaModel = require('../schema/stateSchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET City Page. */
router.get('/addCity', function (req, res, next) {
    stateSchemaModel.find(function (err, state) {
        if (err)
            console.log(err)
        else
            res.render('City/addCity', { states: state });
    })
});

/* POST City Page. */
router.post('/addCity', function (req, res, next) {

    const citySchemaBodyData = {
        city_name: req.body.city_name,
        _state: req.body._state,
    };

    var data = citySchemaModel(citySchemaBodyData);;

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            res.redirect('/city/addCity');
        }
    });
});

/*Display table of City. */
router.get('/displayCity', function (req, res) {
    citySchemaModel.find(function (err, city) {
        console.log(city);

        if (err)
            res.json({ message: 'There is no States.' });
        else {
            citySchemaModel.find({})
                .populate('_state')

                .exec(function (err, city) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(city);
                        res.render('City/display_city', { cities: city });
                    }
                });
        }
    });
});

/*Get Delete Page of City */
router.get('/deleteCity/:id', function (req, res, next) {
    citySchemaModel.findByIdAndRemove(req.params.id, function (err, city) {
        if (err) {
            console.log(err);
            res.redirect('../displayCity');
        }
        else
            res.redirect('../displayCity');
    });
});

/*Shows Single City Data */
router.get('/showCity/:id', function (req, res, next) {
    citySchemaModel.findById(req.params.id, function (err, city) {
        console.log(city);

        if (err)
            res.json({ message: 'There is no States.' });
        else {
            citySchemaModel.findById(req.params.id)
                .populate('_state')

                .exec(function (err, city) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(city);
                        res.render('City/show_city', { cities: city });
                    }
                });
        }
    });
});

/*Get Edit Page of City. */
router.get('/editCity/:id', function (req, res) {
    console.log(req.params.id);
    citySchemaModel.findById(req.params.id, function (err, city) {
        if (err)
            console.log(err);
        else
            console.log(city);
        res.render('City/edit_city', { cities: city });
    });
});

/*Post Edit Page of City */
router.post('/editCity/:id', function (req, res) {
    const citySchemaBodyData = {
        city_name: req.body.city_name
    };

    citySchemaModel.findByIdAndUpdate(req.params.id, citySchemaBodyData, function (err) {
        if (err)
            res.redirect('city/editCity/' + req.params.id);
        else
            res.redirect('../displayCity');
    });
});

module.exports = router;