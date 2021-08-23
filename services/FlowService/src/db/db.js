import { MongoClient } from 'mongodb'
import autoTstConfig from '@autotest/config'
import logger from '../utils/logger.js'

const username = autoTstConfig.get('MONGO_USERNAME_W');
const password = autoTstConfig.get('MONGO_PASSWORD_W');
const cluster = autoTstConfig.get('MONGO_CLUSTER_URL');
const auth = username && password && `${username}:${password}@`;
const dbName = 'flow';

class Database extends Function {
    constructor(auth, cluster, dbName) {
        super()
        this.uri = `mongodb://${auth}${cluster}`
        this.client = new MongoClient(this.uri)
        this.connected = false
        this.dbName = dbName
    }
    async connect() {
        try {
            await this.client.connect()
            this.connected = true
            logger.info('Successfully Connected to MongoDB Cluster!')
        }
        catch (err) {
            logger.error(err, err)
            this.client.close()
        }
    }
    close() {
        if (this.connected)
            this.client.close()
    }
}

const exec = function (...args) {
    return this.client.db(this.dbName).collection(...args)
}
const db = new Database(auth, cluster, dbName)
exec.__proto__ = db

export default exec.bind(db)