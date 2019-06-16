var express = require('express');
var router = express.Router();

var adminSchemaModel = require('../schema/adminSchema');

/*GET Index Page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

// Add New Data of Admin.
/*GET Admin Page. */
router.get('/addAdmin', function (req, res, next) {
    res.render('Admin/addAdmin');
});

/* POST Admin Page. */
router.post('/addAdmin', function (req, res, next) {
    const adminSchemaBodyData = {
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password
    }

    var data = adminSchemaModel(adminSchemaBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(adminSchemaBodyData);
            res.render('Admin/addAdmin');
        }
    });
});

/*Display Table of Admin */
router.get('/displayAdmin', function (req, res) {
    adminSchemaModel.find(function (err, admin) {
        if (err)
            console.log(err);
        else
            res.render('Admin/display_admin', { admins: admin });
    });
});

/*Get Delete Page of Admin */
router.get('/deleteAdmin/:id', function (req, res, next) {
    adminSchemaModel.findByIdAndRemove(req.params.id, function (err, admin) {
        if (err) {
            console.log(err);
            res.redirect('../displayAdmin');
        }
        else
            res.redirect('../displayAdmin');
    });
});

/*Shows Single Admin Data */
router.get('/showAdmin/:id', function (req, res, next) {
    adminSchemaModel.findById(req.params.id, function (err, admin) {
        if (err)
            console.log(err);
        else {
            console.log(admin);
            res.render('Admin/show_admin', { admins: admin });
        }
    });
});

// Edit Data of Admin.
/*Get Edit Page of Admin. */
router.get('/editAdmin/:id', function (req, res) {
    console.log(req.params.id);
    adminSchemaModel.findById(req.params.id, function (err, admin) {
        if (err)
            console.log(err);
        else
            console.log(admin);
        res.render('Admin/edit_admin', { admins: admin });
    });
});

/*Post Edit Page of Admin */
router.post('/editAdmin/:id', function (req, res) {
    const adminSchemaBodyData = {
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password
    }

    adminSchemaModel.findByIdAndUpdate(req.params.id, adminSchemaBodyData, function (err) {
        if (err)
            res.redirect('Admin/editAdmin/' + req.params.id);
        else
            res.redirect('../displayAdmin');
    });
});

module.exports = router;