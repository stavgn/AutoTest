export default {
    $jsonSchema: {
        bsonType: "object",
        required: ["baseUrl"],
        properties: {
            baseUrl: {
                bsonType: "string",
                description: "must be a string and is required"
            }
        }
    }
}