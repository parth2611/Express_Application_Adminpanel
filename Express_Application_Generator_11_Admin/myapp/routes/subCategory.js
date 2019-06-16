var express = require('express');
var router = express.Router();

var subCategorySchemaModel = require('../schema/subCategorySchema');
var categorySchemaModel = require('../schema/categorySchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* Get addSubCategory Page. */
router.get('/addSubCategory', function (req, res, next) {
    categorySchemaModel.find(function (err, category) {
        if (err)
            console.log(err);
        else
            console.log(category);
        res.render('Sub-Category/addSubCategory', { categories: category });
    });
});

/* Post addSubCategory Page. */
router.post('/addSubCategory', function (req, res) {
    console.log(req.body);

    if (!req.files)
        return res.status(400).send('No files were uploaded..!!');

    var subCatImage = req.files.subcategory_image;
    var subCatImageName = req.files.subcategory_image.name;

    subCatImage.mv('public/uploads/' + subCatImageName, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    const subCategorySchemaBodyData = {
        subcategory_name: req.body.subcategory_name,
        subcategory_description: req.body.subcategory_description,
        subcategory_image: subCatImageName,
        _category: req.body._category
    };

    var data = subCategorySchemaModel(subCategorySchemaBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else
            res.redirect('/subCategory/addSubCategory');
    });
});

/*Display table of Sub-Category. */
router.get('/displaySubCategory', function (req, res) {
    subCategorySchemaModel.find(function (err, subcategory) {
        console.log(subcategory);

        if (err)
            res.json({ message: 'There are no Categories.' });
        else {
            subCategorySchemaModel.find({})
                .populate('_category')

                .exec(function (err, subcategory) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(subcategory);
                        res.render('Sub-Category/display_subCategory', { subCategories: subcategory });
                    }
                });
        }
    });
});

/*Get Delete Page of Sub-Category */
router.get('/deleteSubCategory/:id', function (req, res, next) {
    subCategorySchemaModel.findByIdAndRemove(req.params.id, function (err, subcategory) {
        if (err) {
            console.log(err);
            res.redirect('../displaySubCategory');
        }
        else
            res.redirect('../displaySubCategory');
    });
});

/*Shows Single Sub-Category Data */
router.get('/showSubCategory/:id', function (req, res, next) {
    subCategorySchemaModel.findById(req.params.id, function (err, subcategory) {

        console.log(subcategory);

        if (err)
            console.log(err);
        else {
            subCategorySchemaModel.findById(req.params.id)
                .populate('_category')

                .exec(function (err, subcategory) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(subcategory);
                        res.render('Sub-Category/show_subCategory', { subCategories: subcategory });
                    }
                });

        }
    });
});

/*Get Edit Page of Sub-Category. */
router.get('/editSubCategory/:id', function (req, res) {
    console.log(req.params.id);
    subCategorySchemaModel.findById(req.params.id, function (err, subcategory) {

        if (err)
            console.log(err);
        else
            console.log(subcategory);
        res.render('Sub-Category/edit_subCategory', { subCategories: subcategory });
    });
});

/*Post Edit Page of Sub-Category. */
router.post('/editSubCategory/:id', function (req, res) {
    const subCategorySchemaBodyData = {
        subcategory_name: req.body.subcategory_name,
        subcategory_description: req.body.subcategory_description,
    };

    subCategorySchemaModel.findByIdAndUpdate(req.params.id, subCategorySchemaBodyData, function (err) {
        if (err)
            res.redirect('Sub-Category/editSubCategory/' + req.params.id);
        else
            res.redirect('../displaySubCategory');
    });
});

module.exports = router;