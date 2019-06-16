var express = require('express');
var router = express.Router();

var userSchemaModel = require('../../schema/userSchema');

/*Get Delete Page of User. */
router.get('/:id', function (req, res, next) {
    userSchemaModel.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('../displayUser');
        }
        else
            res.redirect('../displayUser');
    });
});

module.exports = router;