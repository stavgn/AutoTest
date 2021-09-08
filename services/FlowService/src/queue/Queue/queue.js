import _ from 'lodash'
import amqp from 'amqplib'
import autoTstConfig from '@autotest/config'
import logger from '../../utils/logger.js'

const queueUrl = autoTstConfig.get('QUEUE_URL')
const queueName = autoTstConfig.get('QUEUE_NAME')

class Queue {
    constructor(queueUrl, queueName) {
        this.queueUrl = queueUrl
        this.queueName = queueName
    }

    loadTasks(tasks) {
        this.tasks = tasks
    }

    exec(message) {
        const { type = '', method = '', body = {} } = message
        const handler = _.get(this.tasks, `${type.toLowerCase()}.${method.toLowerCase()}`, async () => { })
        return handler(body)
    }
    async attemptConnection() {
        const connection = await amqp.connect(`amqp://${this.queueUrl}`)
        const channel = await connection.createChannel();
        channel.assertQueue(this.queueName, {
            durable: false
        })
        this.channel = channel;
        logger.info(`Successfully Connected to RabbitMQ ${this.queueUrl}!`)
    }

    async connect() {
        try {
            logger.info(`Attempting Connection to RabbitMQ ${this.queueUrl}!`)
            await this.attemptConnection()
        }
        catch (err) {
            logger.info(`Could not Connect to RabbitMQ ${this.queueUrl}!`)
            logger.info(`Reattempting in 5 Seconds...`)
            await sleep(5000)
            return this.connect()
        }
    }

    listen() {
        logger.info(`Started consuming messages from queue - ${this.queueName}!`)
        this.channel.consume(this.queueName, (message) => {
            const data = JSON.parse(message.content.toString())
            this.exec(data).then(() => {
                this.channel.ack(message)
            })
        })
    }
}

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


export default new Queue(queueUrl, queueName)