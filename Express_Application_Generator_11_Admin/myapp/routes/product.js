var express = require('express');
var router = express.Router();

var productSchemaModel = require('../schema/productSchema');
var subCategorySchemaModel = require('../schema/subCategorySchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

/* GET addProduct Page. */
router.get('/addProduct', function (req, res, next) {
    subCategorySchemaModel.find(function (err, subcategory) {
        if (err)
            console.log(err);
        else
            res.render('Product/addProduct', { subCategories: subcategory });
    });
});

/* POST addProduct Page. */
router.post('/addProduct', function (req, res) {

    console.log(req.body);

    if (!req.files)
        return res.status(400).send('No files were uploaded..!!');

    var proImage = req.files.product_image;
    var proImageName = req.files.product_image.name;

    proImage.mv('public/uploads/' + proImageName, function (err) {
        if (err)
            return res.status(500).send(err);
    })

    const productSchemaBodyData = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity,
        product_image: proImageName,
        _subcategory: req.body._subcategory
    };

    var data = productSchemaModel(productSchemaBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/product/addProduct');
        }
    });
});

/*Display table of Product. */
router.get('/displayProduct', function (req, res) {
    productSchemaModel.find(function (err, product) {
        console.log(product);

        if (err)
            res.json({ message: 'There are no Sub-Categories.' });
        else {
            productSchemaModel.find({})
                .populate('_subcategory')

                .exec(function (err, product) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(product);
                        res.render('Product/display_product', { products: product });
                    }
                });
        }
    });
});

/*Get Delete Page of Product */
router.get('/deleteProduct/:id', function (req, res, next) {
    productSchemaModel.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) {
            console.log(err);
            res.redirect('../displayProduct');
        }
        else
            res.redirect('../displayProduct');
    });
});

/*Shows Single Product Data */
router.get('/showProduct/:id', function (req, res, next) {
    productSchemaModel.findById(req.params.id, function (err, product) {

        console.log(product);

        if (err)
            // res.json({ message: 'There are no Sub-Categories.' });
            console.log(err);
        else {
            productSchemaModel.findById(req.params.id)
                .populate('_subcategory')

                .exec(function (err, product) {
                    if (err)
                        console.log(err)
                    else {
                        console.log(product);
                        res.render('Product/show_product', { products: product });
                    }
                });
        }
    });
});

/*Get Edit Page of Product. */
router.get('/editProduct/:id', function (req, res) {
    console.log(req.params.id);
    productSchemaModel.findById(req.params.id, function (err, product) {
        if (err)
            console.log(err);
        else
            console.log(product);
        res.render('Product/edit_product', { products: product });
    });
});

/*Post Edit Page of Product */
router.post('/editProduct/:id', function (req, res) {
    const productSchemaBodyData = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity
    };

    productSchemaModel.findByIdAndUpdate(req.params.id, productSchemaBodyData, function (err) {
        if (err)
            res.redirect('Product/editProduct/' + req.params.id);
        else
            res.redirect('../displayProduct');
    });
});

module.exports = router;
