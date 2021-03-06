import cluster from 'cluster'
import { cpus } from 'os'
import fs from 'fs'
import _ from 'lodash'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { GraphQLServer } from 'graphql-yoga'
import autoTstConfig from '@autotest/config'
import logger from './utils/logger.js'
import importModule from './utils/importModule.js'

const isDevEnv = !['staging', 'production'].includes(process.env.NODE_ENV)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080
if (cluster.isPrimary && !isDevEnv) {
    logger.info('Master ' + process.pid + ' is running');
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => { // eslint-disable-line
        logger.info('Worker ' + worker.process.pid + ' died');
    });
} else {

    const serverOptions = {
        port: parseInt(process.env.PORT, 10) || 4000,
        endpoint: '/graphql',
        playground: '/docs',
        tracing: isDevEnv,
        debug: isDevEnv
    }

    const loggingMiddleware = async (resolve) => {
        return resolve();
    }

    const typeDefs = []
    const resolvers = { Query: {} }
    const services = {}
    const loaders = {}

    const modules = fs.readdirSync('./src/modules')
        .filter(file => (file.indexOf('.') !== 0))
        .map(importModule)


    Promise.all(modules).then((modules) => {
        modules.forEach(({ module, default: lib }) => {
            typeDefs.push(lib.typeDefs)
            _.merge(resolvers, lib.resolvers)
            services[module] = lib.services
            if (lib.loaders) {
                loaders[module] = lib.loaders
            }
        });

        const server = new GraphQLServer({
            typeDefs: typeDefs.join(' '),
            resolvers: _.merge({}, resolvers),
            resolverValidationOptions: {
                requireResolversForResolveType: false
            },
            context: async (context) => {
                const req = context.request;
                return {
                    services,
                    loaders,
                    start: new Date().getTime(),
                    req
                }
            },
            middlewares: [loggingMiddleware]
        })

        server.start(serverOptions, ({ port }) => logger.info(`Started on port ${port} , process ${process.pid}`))
        server.express.use('/data', createProxyMiddleware({
            target: autoTstConfig.get('QUEUE_MNGR_SERVICE'),
            changeOrigin: true,
            pathRewrite: { '^/data': '/emit' }
        }))

    }).catch((err) => logger.error(err, err))
}
