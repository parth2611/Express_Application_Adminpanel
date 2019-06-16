var express = require('express');
var router = express.Router();

var userSchemaModel = require('../../schema/userSchema');

/* GET User Page. */
router.get('/addUser', function (req, res, next) {
    res.render('addUser');
});

/* POST User Page. */
router.post('/addUser', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded..!!');

    var userImage = req.files.user_image;
    var userImageName = req.files.user_image.name;

    userImage.mv('public/uploads/' + userImageName, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    const userSchemaBodyData = {
        user_fname: req.body.user_fname,
        user_lname: req.body.user_lname,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_address: req.body.user_address,
        user_pincode: req.body.user_pincode,
        user_mobile: req.body.user_mobile,
        user_dob: req.body.user_dob,
        user_image: userImageName,
        user_gender: req.body.user_gender
    };

    var data = userSchemaModel(userSchemaBodyData);

    data.save(function (err) {
        if (err) {
            console.log(err);
            res.render('addUser');
        }
        else {
            console.log(userSchemaBodyData);
            res.render('addUser');
        }
    });
});

module.exports = router;