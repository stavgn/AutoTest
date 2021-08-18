import path from 'path'
import fs from 'fs'
import gqlLoader from './gqlLoader.js'

const suffixes = [
    '.graphql',
    '.resolvers.js',
    '.services.js',
    '.loaders.js'
];

const safeImport = (path) => {
    if (!fs.existsSync(path)) {
        return Promise.resolve({})
    }
    return import(path);
}

const getPath = (module, suffix = '.js') => path.join(path.resolve(), `src/modules/${module}/${module}${suffix}`)

const execSubImports = async (module, suffixes) => {
    const typeDefs = gqlLoader(getPath(module, suffixes[0]))
    const { default: resolvers = {} } = await safeImport(getPath(module, suffixes[1]))
    const { default: services = {} } = await safeImport(getPath(module, suffixes[2]))
    const { default: loaders = {} } = await safeImport(getPath(module, suffixes[3]))

    return {
        typeDefs,
        resolvers,
        services,
        loaders
    }
}

export default async (module) => {
    const index = getPath(module)
    if (!fs.existsSync(index)) {
        const lib = await execSubImports(module, suffixes);
        return { module, default: lib };
    }

    const lib = await import(index);
    return { module, default: lib.default };
}