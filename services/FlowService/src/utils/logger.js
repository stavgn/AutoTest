import winston from 'winston'

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false
})

logger.stream = {
    write: (message) => {
        logger.info(message)
    }
}

export default logger