import { MongoClient } from 'mongodb'
import autoTstConfig from '@autotest/config'
import logger from '../utils/logger.js'


const username = autoTstConfig.get('MONGO_USERNAME_W');
const password = autoTstConfig.get('MONGO_PASSWORD_W');
const cluster = autoTstConfig.get('MONGO_CLUSTER_URL');
const auth = username && password && `${username}:${password}@`;

const dbName = 'flow';

class Database {
    constructor(auth, cluster) {
        this.uri = `mongodb://${auth}${cluster}`
        this.client = new MongoClient(uri)
        this.connected = false
    }

    async connect() {
        try {
            await this.client.connect()
            this.client = client
            this.connected = true
            logger.info('Successfully Connected to MongoDB Cluster!')
            Object.assign(this, client.db(dbName));
        }
        catch (err) {
            logger.error(err)
            client.close()
        }
    }
    close() {
        if (this.connected)
            this.client.close()
    }

}

export default new Database(auth, cluster);