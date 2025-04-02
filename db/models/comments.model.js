const db = require('../connection')

async function queryPostComment(author, body, article_id) {
    const queryStr = `INSERT INTO comments(article_id, body, author) 
                VALUES ($1, $2, $3)
                RETURNING *`

    if (/^[0-9]+$/.test(article_id)) {
        if (author !== undefined) {
            return db.query(queryStr, [article_id, body, author]).then(({ rows }) => rows[0])
        } else {
            return Promise.reject({ status: 400, message: 'Username field is required'})
        }
    } else {
        return Promise.reject({ status: 400, message: 'Please enter a number for id'})
    }
}

async function queryDeleteComment(comment_id) {
    const queryStr = `DELETE FROM comments WHERE comment_id = $1`

    if (/^[0-9]+$/.test(comment_id)) {
        if (await commentExists(comment_id)) {
            return db.query(queryStr, [comment_id])
        } else {
            return Promise.reject({status: 404, message: `No comments found with id ${comment_id}`})
        }
    } else {
        return Promise.reject({status: 400, message: 'Please enter a number for id'})
    }

}


function commentExists(comment_id) {
    const queryStr = `SELECT * FROM comments WHERE comment_id = $1`
    return db.query(queryStr, [comment_id]).then(({ rows }) => {
        return rows.length > 0
    })
}

function queryPatchVotes(article_id, vote) {
    const queryStr = `UPDATE articles SET votes = votes + $1
                        WHERE article_id = $2
                        RETURNING *`
    if (vote === 'upvote') {
        vote = 1
    } else if (vote === 'downvote') {
        vote = -1
    } else {
        return Promise.reject({status: 400, message: 'Vote must be either upvote or downvote'})
    }

    return db.query(queryStr, [vote, article_id]).then(({ rows }) => {
        return rows[0]
    })
}



module.exports = { queryPostComment, queryDeleteComment, queryPatchVotes }