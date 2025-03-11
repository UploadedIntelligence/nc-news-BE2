const db = require('../connection')

function queryArticlesById(article_id) {
    const regex = /^[0-9]+$/
    let queryStr = 'SELECT * FROM articles'

    if (regex.test(article_id)) {
        queryStr += ' WHERE article_id = $1'
    } else if (article_id !== undefined) {
        return Promise.reject({status: 400, message: 'Please enter a number for id'})
    }

    return db.query(queryStr, [article_id]).then(({ rows }) => rows)
}

function queryAllArticles(order_by = 'desc') {
    // const allowedOrder = ['desc', 'asc']

    let queryStr = `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url,
        (SELECT COUNT(*)::INT FROM comments c WHERE c.article_id = a.article_id) comment_count
    FROM articles a
    ORDER BY a.created_at ${order_by}`

    // if (!allowedOrder.includes(order_by)) {
    //     return Promise.reject({status: 400, message: 'Order type can only be ASC or DESC'})
    // }

    console.log(queryStr, '<<<<<<<<<<<<<<<<<<<<<<<<<')
    return db.query(queryStr).then(({ rows }) => rows)
}

module.exports = { queryArticlesById, queryAllArticles }