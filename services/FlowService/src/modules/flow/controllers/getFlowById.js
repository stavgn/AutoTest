import Joi from 'joi'
import validator from '../../../middlewares/validator.js';
import errorWrapper from '../../../middlewares/errorWrapper.js';
import { findFlowById } from '../../../services/flow.services.js';

const handler = async (req, res) => {
    const flow = await findFlowById(req.params.id)
    res.status(200)
        .json(flow);
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