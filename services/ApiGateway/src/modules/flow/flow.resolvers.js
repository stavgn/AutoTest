
const getFlowById = async (_, args, { services }) => {
    return services.flow.getFlowById(args.id)
}

const createFlow = async (_, args, { services }) => {
    const flow = await services.flow.createFlow(args);

    if (!flow) {
        throw new Error('flow not created')
    }
    return flow;
}

export default {
    Query: {
        getFlowById
    },
    Mutation: {
        createFlow
    }
}