export default {
    $jsonSchema: {
        bsonType: "object",
        required: ["user", "sessionId", "location", "endpoint", "timestamp"],
        properties: {
            user: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            flowId: {
                bsonType: "objectId",
                description: "must be a objectId and is required"
            },
            location: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            endpoint: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            timestamp: {
                bsonType: "timestamp",
                description: "must be a timestamp and is required"
            },
            request: {
                bsonType: "object"
            },
            response: {
                bsonType: "object"
            }
        }
    }
}