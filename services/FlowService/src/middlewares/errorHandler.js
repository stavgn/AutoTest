import _ from 'lodash'
import logger from '../utils/logger.js'

export default (error, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    logger.error(error.toString ? error.toString() : { error })
    res.status(_.get(error, 'status') || _.get(error, '[0].status') || 500)
    res.json(error.toString ? error.toString() : { error })
}