import Joi from 'joi'

export default (schema) => (req, res, next) => {
    const errors = [];
    Object.keys(schema).forEach((type) => {
        try {
            Joi.assert(req[type] || {}, schema[type]);
        }
        catch (err) {
            errors.push({
                status: 400,
                title: 'Bad Parameter',
                details: err.message

            })
        }
    })

    if (errors.length) {
        return next(errors);
    }
    return next();
}

