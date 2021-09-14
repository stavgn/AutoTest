import db from '../db/db.js'
import { ObjectId } from 'mongodb'

export const createSequence = (data) => {
    try {
        if (typeof data.flowId == 'string') {
            data.flowId = ObjectId(data.flowId)
        }
        if (data._id && typeof data._id == 'string') {
            data._id = ObjectId(data._id)
        }
        return db("sequence").insertOne(data).catch((e) => console.log(JSON.stringify(e.errInfo.details)))
    } catch (err) {
        console.log(err)
    }
}

export const updateSequenceById = (id, data) => {
    try {
        return db("sequence").updateOne({ _id: ObjectId(id) }, { $set: data })
    }
    catch (err) {
        console.log(err)
    }
}

export const getSequenceById = (id) => {
    return db("sequence").findOne({ _id: ObjectId(id) })
}