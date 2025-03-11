const db = require('../connection')

function queryArticlesById(article_id) {
    const regex = /^[0-9]+$/
    let queryStr = 'SELECT * FROM articles'

    if (regex.test(article_id)) {
        queryStr += ' WHERE article_id = $1'
    } else if (article_id !== undefined) {
        return Promise.reject({ status: 400, message: 'Please enter a number for id' })
    }

    return db.query(queryStr, [article_id]).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: `Could not find an article with id ${article_id}` })
        }
        return rows
    })
}

function queryAllArticles(order_by = 'desc') {
    // const allowedOrder = ['desc', 'asc']

    let queryStr = `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url,
        (SELECT COUNT(*)::INT FROM comments c 
                              WHERE c.article_id = a.article_id) comment_count
    FROM articles a
    ORDER BY a.created_at ${order_by}`;

    // if (!allowedOrder.includes(order_by)) {
    //     return Promise.reject({status: 400, message: 'Order type can only be ASC or DESC'})
    // }

    return db.query(queryStr).then(({ rows }) => rows)
}

function queryArticleComments(article_id, order_by = 'desc') {
    const regex = /^[0-9]+$/

    let queryStr = `SELECT * FROM comments
         WHERE article_id = $1
         ORDER BY created_at ${order_by}`;

    if (regex.test(article_id)) {
        return db.query(queryStr, [article_id]).then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, message: `Could not find comments for article id ${article_id}`})
            }
            return rows
        })
    } else {
        return Promise.reject({ status: 400, message: 'Please enter a number for id' })
    }
}

module.exports = { queryArticlesById, queryAllArticles, queryArticleComments }