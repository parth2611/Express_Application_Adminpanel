var express = require('express');
var router = express.Router();

var stateSchemaModel = require('../schema/stateSchema');
var countryschemaModel = require('../schema/countrySchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET State Page. */
router.get('/addState', function (req, res, next) {
    countryschemaModel.find(function (err, country) {
        if (err)
            console.log(err);
        else
            console.log(country);
        res.render('State/addState', { countries: country });
    });
});

/* POST State Page. */
router.post('/addState', function (req, res, next) {

    const stateSchemaBodyData = {
        state_name: req.body.state_name,
        _country: req.body._country
    };

    var data = stateSchemaModel(stateSchemaBodyData);;

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            res.redirect('/state/addState');
        }
    });
});

/*Display table of State. */
router.get('/displayState', function (req, res) {
    stateSchemaModel.find(function (err, state) {

        console.log(state);

        if (err)
            res.json({ message: 'There are no Countries.' });
        else {
            stateSchemaModel.find({})
                .populate('_country')

                .exec(function (err, state) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(state);
                        res.render('State/display_state', { states: state });
                    }
                });
        }
    });
});

/*Get Delete Page of State */
router.get('/deleteState/:id', function (req, res, next) {
    stateSchemaModel.findByIdAndRemove(req.params.id, function (err, state) {
        if (err) {
            console.log(err);
            res.redirect('../displayState');
        }
        else
            res.redirect('../displayState');
    });
});

/*Shows Single state Data */
router.get('/showState/:id', function (req, res, next) {
    stateSchemaModel.findById(req.params.id, function (err, state) {
        console.log(state);
        if (err)
            res.json({ message: 'There are no Countries.' });
        else {
            stateSchemaModel.findById(req.params.id)
                .populate('_country')

                .exec(function (err, state) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(state);
                        res.render('State/show_state', { states: state });
                    }
                });
        }
    });
});

/*Get Edit Page of State. */
router.get('/editState/:id', function (req, res) {
    console.log(req.params.id);
    stateSchemaModel.findById(req.params.id, function (err, state) {
        if (err)
            console.log(err);
        else
            console.log(state);
        res.render('State/edit_state', { states: state });
    });
});

/*Post Edit Page of State */
router.post('/editState/:id', function (req, res) {
    const stateSchemaBodyData = {
        state_name: req.body.state_name
    };

    stateSchemaModel.findByIdAndUpdate(req.params.id, stateSchemaBodyData, function (err) {
        if (err)
            res.redirect('State/editState/' + req.params.id);
        else
            res.redirect('../displayState');
    });
});

module.exports = router;