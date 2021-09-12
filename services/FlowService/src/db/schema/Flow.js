export default {
    $jsonSchema: {
        bsonType: "object",
        required: ["baseUrl", "user"],
        properties: {
            baseUrl: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            user: {
                bsonType: "string",
                description: "must be a string and is required"
            },
        }
    }
}