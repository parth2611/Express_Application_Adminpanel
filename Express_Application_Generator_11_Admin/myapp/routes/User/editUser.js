var express = require('express');
var router = express.Router();

var userSchemaModel = require('../../schema/userSchema');

/*Get Edit Page of User. */
router.get('/:id', function (req, res) {
    console.log(req.params.id);
    userSchemaModel.findById(req.params.id, function (err, user) {
        if (err)
            console.log(err);
        else
            console.log(user);
        res.render('edit_user', { users: user });
    });
});

/*Post Edit Page of User. */
router.post('/:id', function (req, res) {
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
        user_gender: req.body.user_gender
    };

    userSchemaModel.findByIdAndUpdate(req.params.id, userSchemaBodyData, function (err) {
        if (err)
            res.redirect('editUser/' + req.params.id);
        else
            res.redirect('../displayUser');
    });
});

module.exports = router;