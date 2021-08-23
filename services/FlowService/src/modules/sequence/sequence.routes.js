import express from 'express'
import createSequence from './controllers/createSequence.js';
import getSequenceById from './controllers/getSequenceById.js'
import updateSequenceById from './controllers/updateSequenceById.js'

const router = express.Router()

router.post('/', createSequence.validations, createSequence.handler)
router.get('/:id', getSequenceById.validations, getSequenceById.handler)
router.put('/:id', updateSequenceById.validations, updateSequenceById.handler)

export default router