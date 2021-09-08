import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import { createFlow } from '../../../services/flow.services.js'

const handler = async (req, res) => {
    const flow = await createFlow(req.body)
    console.log({ flow })
    res.status(201)
        .json({ _id: flow.insertedId });
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