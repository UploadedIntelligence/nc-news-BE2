const db = require('../connection')

function queryUsers(username) {
    let queryStr = `SELECT * FROM users`
    if (!username) {
        return db.query(queryStr).then(({ rows }) => rows)
    } else {
        queryStr += ` WHERE username = $1`
        return db.query(queryStr, [username]).then(({rows}) => {
            return rows[0]})
    }
}

module.exports = { queryUsers }