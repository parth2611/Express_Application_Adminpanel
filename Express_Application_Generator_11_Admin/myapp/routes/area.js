var express = require('express');
var router = express.Router();

var areaSchemaModel = require('../schema/areaSchema');
var citySchemaModel = require('../schema/citySchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET Area Page. */
router.get('/addArea', function (req, res, next) {
    citySchemaModel.find(function (err, city) {
        if (err)
            console.log(err)
        else
            res.render('Area/addArea', { cities: city });
    });
});

/* POST Area Page. */
router.post('/addArea', function (req, res, next) {
    const areaSchemaBodyData = {
        area_name: req.body.area_name,
        _city: req.body._city,
    };

    var data = areaSchemaModel(areaSchemaBodyData);;

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            res.redirect('/area/addArea');
        }
    });
});

/*Display table of Area. */
router.get('/displayArea', function (req, res) {
    areaSchemaModel.find(function (err, area) {

        console.log(area);

        if (err)
            res.json({ message: 'There is no Cities.' });
        else {
            areaSchemaModel.find({})
                .populate('_city')

                .exec(function (err, area) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(area);
                        res.render('Area/display_area', { areas: area });
                    }
                });
        }
    });
});

/*Get Delete Page of Area */
router.get('/deleteArea/:id', function (req, res, next) {
    areaSchemaModel.findByIdAndRemove(req.params.id, function (err, area) {
        if (err) {
            console.log(err);
            res.redirect('../displayArea');
        }
        else
            res.redirect('../displayArea');
    });
});

/*Shows Single Area Data */
router.get('/showArea/:id', function (req, res, next) {
    areaSchemaModel.findById(req.params.id, function (err, area) {

        console.log(area);
        if (err)
            res.json({ message: 'There is no Cities.' });
        else {
            areaSchemaModel.findById(req.params.id)
                .populate('_city')

                .exec(function (err, area) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(area);
                        res.render('Area/show_area', { areas: area });
                    }
                });
        }
    });
});

/*Get Edit Page of Area. */
router.get('/editArea/:id', function (req, res) {
    console.log(req.params.id);
    areaSchemaModel.findById(req.params.id, function (err, area) {
        if (err)
            console.log(err);
        else
            console.log(area);
        res.render('Area/edit_area', { areas: area });
    });
});

/*Post Edit Page of Area */
router.post('/editArea/:id', function (req, res) {
    const areaSchemaBodyData = {
        area_name: req.body.area_name
    };

    areaSchemaModel.findByIdAndUpdate(req.params.id, areaSchemaBodyData, function (err) {
        if (err)
            res.redirect('Area/editArea/' + req.params.id);
        else
            res.redirect('../displayArea');
    });
});

module.exports = router;