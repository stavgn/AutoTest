import path from 'path'
import fs from 'fs'

const safeImport = (path) => {
    if (!fs.existsSync(path)) {
        return Promise.resolve({})
    }
    return import(path);
}

const getPath = (module) => path.join(path.resolve(), `src/modules/${module}/${module}.routes.js`)

export default async (module) => {
    const path = getPath(module)
    const { default: router } = await safeImport(path)
    return { module, router };
}