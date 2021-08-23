import express from 'express'
import createFlow from './controllers/createFlow.js';


const router = express.Router()

router.post('/', createFlow.validations, createFlow.handler)

export default router