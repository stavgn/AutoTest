import express from 'express'
import createFlow from './controllers/createFlow.js';
import getFlowById from './controllers/getFlowById.js';


const router = express.Router()

router.post('/', createFlow.validations, createFlow.handler)
router.get('/:id', getFlowById.validations, getFlowById.handler)

export default router