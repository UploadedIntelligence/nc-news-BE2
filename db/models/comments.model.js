const db = require('../connection')

function queryPostComment(author, body, article_id) {
    const queryStr = `INSERT INTO comments(article_id, body, author) 
                VALUES ($1, $2, $3)
                RETURNING *`

    return db.query(queryStr, [article_id, body, author]).then(({ rows }) => rows[0])
}

module.exports = { queryPostComment }