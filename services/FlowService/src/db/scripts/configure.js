import { MongoClient } from 'mongodb'
import autoTstConfig from '@autotest/config'
import Flow from '../schema/Flow.js'
import Sequence from '../schema/Sequence.js'
import logger from '../../utils/logger.js'


const username = autoTstConfig.get('MONGO_USERNAME_W');
const password = autoTstConfig.get('MONGO_PASSWORD_W');
const cluster = autoTstConfig.get('MONGO_CLUSTER_URL');
const auth = username && password && `${username}:${password}@`;
const dbName = 'flow';

export async function configure() {
    const uri = `mongodb://${auth}${cluster}`;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.createCollection('flow', { validator: Flow })
        await db.createCollection('sequence', { validator: Sequence })
        logger.info('MongoDb Successfully Configured!')
    }
    finally {
        client.close()
    }
}


