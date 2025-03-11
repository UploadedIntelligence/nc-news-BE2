const { queryPostComment } = require('../models/comments.model')

function postComment(req, res, next) {
    const { username, body } = req.body;
    const { article_id } = req.params

    queryPostComment(username, body, article_id).then(comment => {
        res.status(200).send({ comment: comment})
    }).catch(err => {
        next(err)
    })
}

module.exports = { postComment }