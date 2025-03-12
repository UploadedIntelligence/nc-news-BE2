const db = require('../connection')

function queryUsers() {
    const queryStr = `SELECT * FROM users`

    return db.query(queryStr).then(({ rows }) => rows)
}

module.exports = { queryUsers }