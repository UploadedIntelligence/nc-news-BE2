const db = require('../connection')

function checkIsNum(valueToCheck) {
    return /^[0-9]+$/.test(valueToCheck)
}

function itemsFound(queryStr, queryParams) {
    const params = Object.values(queryParams)
    return db.query(queryStr, params).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, message: `No items found for id ${queryParams.article_id}`})
        }
        return rows
    })
}

function queryArticlesById(article_id) {
    let queryStr = 'SELECT * FROM articles'

    if (checkIsNum(article_id)) {
        queryStr += ' WHERE article_id = $1'
    } else if (article_id !== undefined) {
        return Promise.reject({ status: 400, message: 'Please enter a number for id' })
    }

    return itemsFound(queryStr, {article_id})
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
    let queryStr = `SELECT * FROM comments
         WHERE article_id = $1
         ORDER BY created_at ${order_by}`;

    if (checkIsNum(article_id)) {
        return itemsFound(queryStr, {article_id})
    } else {
        return Promise.reject({ status: 400, message: 'Please enter a number for id' })
    }
}

function queryPatchArticle (article_id, voteChange) {
    const queryStr = `UPDATE articles SET votes = votes + $1 
                WHERE article_id = $2
                RETURNING *`

    if (checkIsNum(article_id) && checkIsNum(voteChange)) {
        return itemsFound(queryStr, {voteChange, article_id})
    } else {
        return Promise.reject({status: 400, message: 'Please enter a number for id and vote change'})
    }
}

module.exports = { queryArticlesById, queryAllArticles, queryArticleComments, queryPatchArticle }