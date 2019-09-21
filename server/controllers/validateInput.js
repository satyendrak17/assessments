
const Joi = require('joi');
// const validator = require('express-joi-validation')({});
// const myCustomJoi = Joi.extend(require('joi-phone-number'));
// Joi validation schema
const schema = Joi.object({
    email: Joi.string().email({ minDomainAtoms: 2 })
});

function validateEmailMobile(req) {
    // Return result.
    const input = {
        email: req.body.email
    };
    const result = Joi.validate(input, schema);
    return result;
}

module.exports = {
    validateEmailMobile: validateEmailMobile
};