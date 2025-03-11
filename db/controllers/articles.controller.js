const { queryArticlesById, queryAllArticles, queryArticleComments } = require('../models/articles.model')

function getArticles(req, res, next) {
    const { article_id } = req.params
    const { order_by } = req.query

    if (article_id) {
        queryArticlesById(article_id).then( articles => {
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

function getArticleComments(req, res, next) {
    const { article_id } = req.params

    queryArticleComments(article_id).then( comments => {
        res.status(200).send({ comments: comments })
    }).catch(err => {
        next(err)
    })
}

module.exports = { getArticles, getArticleComments }