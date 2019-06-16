var express = require('express');
var router = express.Router();

var categorySchemaModel = require('../schema/categorySchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET addCategory Page. */
router.get('/addCategory', function (req, res, next) {
    res.render('Category/addCategory');
});

/* POST addCategory Page. */
router.post('/addCategory', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were Uploaded..!!');

    var catImage = req.files.category_image;
    var catImageName = req.files.category_image.name;

    catImage.mv('public/uploads/' + catImageName, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    var categorySchemaBodyData = {
        category_name: req.body.category_name,
        category_description: req.body.category_description,
        category_image: catImageName
    };

    var data = categorySchemaModel(categorySchemaBodyData);

    data.save(function (err) {
        if (err) {
            res.render('Category/addCategory', { message: 'Category is not registered successfully..!!' })
        }
        else {
            res.render('Category/addCategory', { message: 'Category is registered successfully..!!' });
        }
    });
});

/*Display table of Category. */
router.get('/displayCategory', function (req, res) {
    categorySchemaModel.find(function (err, category) {
        if (err)
            console.log(err);
        else
            res.render('Category/display_category', { categories: category });
    });
});

/*Get Delete Page of Category */
router.get('/deleteCategory/:id', function (req, res, next) {
    categorySchemaModel.findByIdAndRemove(req.params.id, function (err, category) {
        if (err) {
            console.log(err);
            res.redirect('../displayCategory');
        }
        else
            res.redirect('../displayCategory');
    });
});

/*Shows Single Category Data */
router.get('/showCategory/:id', function (req, res, next) {
    categorySchemaModel.findById(req.params.id, function (err, category) {
        if (err)
            console.log(err);
        else {
            console.log(category);
            res.render('Category/show_category', { categories: category });
        }
    });
});

/*Get Edit Page of Category. */
router.get('/editCategory/:id', function (req, res) {
    console.log(req.params.id);
    categorySchemaModel.findById(req.params.id, function (err, category) {
        if (err)
            console.log(err);
        else
            console.log(category);
        res.render('Category/edit_category', { categories: category });
    });
});

/*Post Edit Page of Category */
router.post('/editCategory/:id', function (req, res) {
    const categorySchemaBodyData = {
        category_name: req.body.category_name,
        category_description: req.body.category_description
    };

    categorySchemaModel.findByIdAndUpdate(req.params.id, categorySchemaBodyData, function (err) {
        if (err)
            res.redirect('Category/editCategory/' + req.params.id);
        else
            res.redirect('../displayCategory');
    });
});

module.exports = router;
