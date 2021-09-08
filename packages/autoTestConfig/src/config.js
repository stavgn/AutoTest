export default {
    default: {
        FLOW_SERVICE: "http://localhost:8080",
        QUEUE_MNGR_SERVICE: "http://localhost:5000",
        QUEUE_URL: 'localhost',
        QUEUE_NAME: 'default',
        MONGO_USERNAME_W: '',
        MONGO_PASSWORD_W: '',
        MONGO_CLUSTER_URL: 'localhost:27017'
    },
    staging: {
        MONGO_CLUSTER_URL: 'mongodb:27017',
        FLOW_SERVICE: "http://flow:8080",
        QUEUE_MNGR_SERVICE: "http://queuemanager:5000",
        QUEUE_URL: 'rabbitmq'

    },
    production: {

    }
}