const db = require('../connection')

function queryTopics() {
    const queryStr = `SELECT * FROM topics`
    return db.query(queryStr).then(({rows}) => rows)
}

module.exports = { queryTopics }