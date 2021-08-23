import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import db from '../../../db/db.js'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
    const sequence = await db("sequence").findOne({ _id: ObjectId(req.params.id) })
    res.status(200)
        .json(sequence);
}

const validations = {
    params: Joi.object({
        id: Joi.string().required()
    })
}

export default {
    handler: errorWrapper(handler),
    validations: validator(validations)
}