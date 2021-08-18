import path from 'path'
import fs from 'fs'
import logger from './logger.js';

export default async (module) => {
    const index = path.join(path.resolve(), `src/modules/${module}/index.js`)
    if (!fs.existsSync(index)) {
        return Promise.resolve({});
    }

    const lib = await import(index);
    logger.info('asdfghjkgcfxdoirtcjm', lib)
    return { module, default: lib.default };
}