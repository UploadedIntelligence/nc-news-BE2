const { queryUsers } = require('../models/users.model')

function getUsers(req, res, next) {
    const { username } = req.params
    console.log(username)
    queryUsers(username).then( users => {
        res.status(200).send({ users: users })
    }).catch(err => next(err))
}

module.exports = { getUsers }