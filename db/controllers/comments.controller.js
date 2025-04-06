const { queryPostComment, queryDeleteComment, queryPatchCommentVotes} = require('../models/comments.model')

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

function patchCommentVotes(req, res, next) {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    queryPatchCommentVotes(comment_id, inc_votes).then((comment) => {
        console.log(comment)
        res.status(200).send({comment: comment})
    }).catch(err => next(err))
}

module.exports = { postComment, deleteComment, patchCommentVotes }