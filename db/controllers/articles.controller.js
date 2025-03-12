const { queryArticlesById, queryAllArticles, queryArticleComments, queryPatchArticle} = require('../models/articles.model')

function getArticles(req, res, next) {
    const { article_id } = req.params
    const { order_by } = req.query

    if (article_id) {
        queryArticlesById(article_id).then( articles => {
            res.status(200).send({ article: articles[0] })
        }).catch(err => next(err))
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
    }).catch(err => next(err))
}

function patchArticle(req, res, next) {
    const { article_id } = req.params
    const voteChange = req.body.inc_votes

    queryPatchArticle(article_id, voteChange).then( article => {
        res.status(200).send({ article: article[0] })
    }).catch(err => {

        next(err)
    })
}

module.exports = { getArticles, getArticleComments, patchArticle }