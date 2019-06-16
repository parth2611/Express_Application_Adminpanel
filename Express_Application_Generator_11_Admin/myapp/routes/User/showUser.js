var express = require('express');
var router = express.Router();

var userSchemaModel = require('../../schema/userSchema');

/*Shows Single User Data */
router.get('/:id', function (req, res, next) {
    userSchemaModel.findById(req.params.id, function (err, user) {
        if (err)
            console.log(err);
        else {
            console.log(user);
            res.render('show_user', { users: user });
        }
    });
});

module.exports = router;