import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import db from '../../../db/db.js'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
    await db("sequence").updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
    res.status(200)
        .end();
}

const validations = {
    params: Joi.object({
        id: Joi.string().required()
    }),
    body: Joi.object({
        request: Joi.object(),
        response: Joi.object(),
    })
}

export default {
    handler: errorWrapper(handler),
    validations: validator(validations)
}