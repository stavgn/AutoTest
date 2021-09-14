import express from 'express'
import fs from 'fs'
import Queue from './queue/Queue/queue.js'
import queueTasks from './queue/queue.tasks.js'
import Database from './db/db.js'
import importRoute from './utils/importRoutes.js'
import logger from './utils/logger.js'
import erorrHandler from './middlewares/errorHandler.js'
import { configure as mongoConfig } from './db/scripts/configure.js'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080
const app = express()
await Database.connect()

app.use(express.json())

const routes = fs.readdirSync('./src/modules')
    .filter(file => (file.indexOf('.') !== 0))
    .map(importRoute)

Promise.all(routes).then((routes) => {
    routes.forEach(({ module, router }) => {
        app.use(`/${module}`, router, erorrHandler)
    });
})

app.get('/config', async (req, res) => {
    await mongoConfig()
    res.status(200)
        .json({ configure: true })

})

app.listen(port, host, () => {
    logger.info(`Flow Service is listening at http://localhost:${process.env.PORT || 8080}`)
})

Queue.loadTasks(queueTasks);
Queue.connect().then(() => {
    Queue.listen()
})
