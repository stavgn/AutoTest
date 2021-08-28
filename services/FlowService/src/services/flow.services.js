import db from '../db/db.js'
import { ObjectId } from 'mongodb'

export const createFlow = (data) => {
    return db("flow").insertOne(data)
}

export const findFlowById = (id) => {
    return db("flow").findOne({ _id: ObjectId(id) })
}