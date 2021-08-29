import { createFlow } from '../services/flow.services.js'
import { createSequence, updateSequenceById } from '../services/sequence.services.js'

const tasks = {
    sequence: {
        create: createSequence,
        update: updateSequenceById
    },
    flow: {
        create: createFlow
    }
}

export default tasks