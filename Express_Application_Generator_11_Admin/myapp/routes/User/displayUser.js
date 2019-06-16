var express = require('express');
var router = express.Router();

var userSchemaModel = require('../../schema/userSchema');

/*Display Table of User */
router.get('/displayUser', function (req, res) {
    userSchemaModel.find(function (err, user) {
        if (err)
            console.log(err);
        else
            res.render('display_user', { users: user });
    });
});

module.exports = router;