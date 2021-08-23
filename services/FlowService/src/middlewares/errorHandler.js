import _ from 'lodash'

export default (error, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.log(error)
    res.status(_.get(error, 'status') || _.get(error, '[0].status') || 500)
    res.json(error.toString ? error.toString() : { error })
}