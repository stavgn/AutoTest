import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import { updateSequenceById } from '../../../services/sequence.services.js';


const handler = async (req, res) => {
    await updateSequenceById(req.params.id, req.body)
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