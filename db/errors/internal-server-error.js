function internalServerError(err, req, res) {
    res.status(500).send({message: "Server could not respond!"})
}

module.exports = internalServerError