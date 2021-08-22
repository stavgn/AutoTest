import config from './config.js'
const ENV = process.env.NODE_ENV;

const megred = Object.assign({}, config.default, config[ENV] || {});

const withEnvOverrides = Object.keys(megred).reduce((acc, next) => {
    acc[next] = process.env[next] || megred[next];
    return acc;
}, {})

const get = (key) => {
    return withEnvOverrides[key];
}

const env = () => ENV

export default {
    get,
    env,
}
