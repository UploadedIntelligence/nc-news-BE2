const db = require('../connection')

async function queryArticles(article_id) {
    const regex = /^[0-9]+$/
    let queryStr = 'SELECT * FROM articles'

    if (regex.test(article_id)) {
        queryStr += ' WHERE article_id = $1'
    } else if (article_id !== undefined) {
        return Promise.reject({status: 400, message: 'Please enter a number for id'})
    }

    return db.query(queryStr, [article_id]).then(({rows}) => rows)
}



module.exports = { queryArticles }