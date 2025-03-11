function customError(err, req, res, next) {
    if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message })
    } else if (err.code === '23503') {
        return res.status(404).send({ message: err.detail })
    }
    else {
        next(err)
    }
}

module.exports = { customError }