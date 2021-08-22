import express from 'express'
import fs from 'fs'
import Database from './db/db.js'
import importRoute from './utils/importRoutes.js'

const app = express()
await Database.connect()

app.use(express.json())
app.use((req, res, next) => {
    re.db = Database
    next()
})

const routes = fs.readdirSync('./src/modules')
    .filter(file => (file.indexOf('.') !== 0))
    .map(importRoute)

Promise.all(routes).then((routes) => {
    routes.forEach(({ module, router }) => {
        app.use(`/${module}`, router)
    });
})

