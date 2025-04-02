const { queryPostComment, queryDeleteComment, queryPatchVotes} = require('../models/comments.model')

function postComment(req, res, next) {
    const { username, body } = req.body;
    const { article_id } = req.params;

    queryPostComment(username, body, article_id).then(comment => {
        res.status(201).send({ comment: comment})
    }).catch(err => {
        next(err)
    })
}

function deleteComment(req, res, next) {
    const { comment_id } = req.params;

    queryDeleteComment(comment_id).then(() => {
        res.status(204).end()
    }).catch(err => next(err))
}

function patchVotes(req, res, next) {
    const { article_id, vote } = req.params;

    queryPatchVotes(article_id, vote).then((article) => {
        res.status(200).send({article: article})
    }).catch(err => next(err))
}

module.exports = { postComment, deleteComment, patchVotes }