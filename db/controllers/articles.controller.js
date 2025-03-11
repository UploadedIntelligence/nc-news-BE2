const { queryArticlesById, queryAllArticles} = require('../models/articles.model')

function getArticles(req, res, next) {
    const { article_id } = req.params
    const { order_by } = req.query

    if (article_id) {
        queryArticlesById(article_id).then( articles => {
            if (articles.length === 0) {
                return Promise.reject({status: 404, message: `Could not find an article with id ${article_id}`})
            }
            res.status(200).send({ articles: articles })
        }).catch(err => {
            next(err)
        })
    } else {
        queryAllArticles(order_by).then( articles => {
            res.status(200).send({ articles: articles })
        })
    }
}


module.exports = { getArticles }