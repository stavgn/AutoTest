
const getFlowById = async (_, args, ctx) => {
    return {
        id: 'id'
    }
}

const createFlow = async (_, args, { services }) => {
    const flow = await services.flow.createFlow();

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