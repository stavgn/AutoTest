const getSequenceById = async (_, args, ctx) => {
    return await services.flow.getFlowById(args.id)
}

const createSequence = async (_, args, { services }) => {
    const flow = await services.flow.createFlow(args);

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
        createSequence
    }
}