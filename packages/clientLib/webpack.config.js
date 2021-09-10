import path from 'path'

export default {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(path.resolve(), 'dist'),
        library: 'autoTestClient',
        libraryTarget: 'umd'
    },
}