import db from '../db/db.js'
import { ObjectId } from 'mongodb'

export const createSequence = (data) => {
    return db("sequence").insertOne(data)
}

export const updateSequenceById = (id, data) => {
    return db("sequence").updateOne({ _id: ObjectId(id) }, { $set: data })
}

export const getSequenceById = (id) => {
    return db("sequence").findOne({ _id: ObjectId(id) })
}