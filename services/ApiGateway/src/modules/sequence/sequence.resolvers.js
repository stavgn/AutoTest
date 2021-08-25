const getSequenceById = async (_, args, { services }) => {
    return await services.sequence.getSequenceById(args.id)
}

const createSequence = async (_, args, { services }) => {
    const sequence = await services.sequence.createSequence(args);

    if (!sequence) {
        throw new Error('sequence not created')
    }
    return sequence;
}

const updateSequenceById = async (_, args, { services }) => {
    const flow = await services.sequence.updateSequenceById(args);

    if (!flow) {
        throw new Error('sequence not created')
    }
    return flow;
}

export default {
    Query: {
        getSequenceById
    },
    Mutation: {
        createSequence,
        updateSequenceById
    }
}