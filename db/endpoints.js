const express = require('express')
const data = require('../endpoints.json')
const app = express()
const apiRouter = express.Router()
const articlesRouter = express.Router()
const commentsRouter = express.Router()
const { getTopics } = require('./controllers/topics.controller')
const { getArticles, getArticleComments, patchArticleVotes} = require('./controllers/articles.controller')
const internalServerError = require('./errors/internal-server-error')
const { customError } = require('./errors/invalid-data-type-error')
const { postComment, deleteComment, patchCommentVotes} = require("./controllers/comments.controller");
const { getUsers } = require("./controllers/users.controller");
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)

apiRouter.get('', (req, res) => {
    res.status(200).send({ endpoints: data})
})

apiRouter.get('/topics', getTopics)

apiRouter.get('/users', getUsers)
apiRouter.get('/users/:username', getUsers)

articlesRouter.get('', getArticles)

articlesRouter.route('/:article_id')
    .get(getArticles)
    .patch(patchArticleVotes)

articlesRouter.route('/:article_id/comments')
    .get(getArticleComments)
    .post(postComment)

commentsRouter.route('/:comment_id')
    .delete(deleteComment)
    // TBD
    .patch(patchCommentVotes)

app.all('*', (req, res) => {
    res.status(404).send({ message: 'Path not found' })
})

app.use(customError)

app.use(internalServerError)

module.exports = app