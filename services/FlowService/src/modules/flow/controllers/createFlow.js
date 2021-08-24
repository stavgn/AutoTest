import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import db from '../../../db/db.js'

const handler = async (req, res) => {
    const flow = await db("flow").insertOne(req.body)
    res.status(201)
        .json({ id: flow.insertedId });
}

const validations = {
    body: Joi.object({
        baseUrl: Joi.string().required()
    })
}

export default {
    handler: errorWrapper(handler),
    validations: validator(validations)
}