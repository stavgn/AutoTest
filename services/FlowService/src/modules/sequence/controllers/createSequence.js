import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import db from '../../../db/db.js'

const handler = async (req, res) => {
    const sequence = await db("sequence").insertOne(req.body)
    res.status(201)
        .json({ id: sequence.insertedId });
}

const validations = {
    body: Joi.object({
        user: Joi.string().required(),
        flowId: Joi.string().required(),
        location: Joi.string().required(),
        endpoint: Joi.string().required(),
        timestamp: Joi.date().required(),
        request: Joi.object(),
        response: Joi.object(),
    })
}

export default {
    handler: errorWrapper(handler),
    validations: validator(validations)
}