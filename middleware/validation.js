const {check} = require('express-validator');
exports.groceriesValidation = [
    check('type', 'Food type is required').not().isEmpty(),
    check('item', 'Name of item is required').not().isEmpty()
]

const groceriesValidator = require('../validator/validate')
    const saveGroceries = (req, res, next) => {
        const validationRule = {
            type: 'required|stirng',
            item: 'required|string',
            price: 'required|string'
        };

    groceriesValidator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.satus(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            });
        } else {
            next();
        }
    });
}

const mediaValidator = require('../validator/validate')
    const saveMedia = (req, res, next) => {
        const validationRule = {
            type: 'required|stirng',
            item: 'required|string',
            price: 'required|string'
        };

    mediaValidator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.satus(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            });
        } else {
            next();
        }
    });
}

module.exports = {
    saveGroceries,
    saveMedia
};