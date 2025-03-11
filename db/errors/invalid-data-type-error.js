function customError(err, req, res, next) {
    if (err.status && err.message) {
        return res.status(err.status).send({message: err.message})
    } else {
        next(err)
    }
}

module.exports = { customError }