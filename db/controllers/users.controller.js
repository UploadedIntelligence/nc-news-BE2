const { queryUsers } = require('../models/users.model')

function getUsers(req, res, next) {
    queryUsers().then( users => {
        console.log(users, '<<<<<<<<<<<<<<<<<<<<')
        res.status(200).send({ users: users })
    })
}

module.exports = { getUsers }