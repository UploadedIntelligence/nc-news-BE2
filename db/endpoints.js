const express = require('express')
const data = require('../endpoints.json')
const app = express()
const apiRouter = express.Router()
const articlesRouter = express.Router()
const { getTopics } = require('./controllers/topics.controller')
const { getArticles, getArticleComments, patchArticle} = require('./controllers/articles.controller')
const internalServerError = require('./errors/internal-server-error')
const { customError } = require('./errors/invalid-data-type-error')
const { postComment, deleteComment} = require("./controllers/comments.controller");
const { getUsers } = require("./controllers/users.controller");
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api', apiRouter)
apiRouter.use('/articles', articlesRouter)

apiRouter.get('', (req, res) => {
    res.status(200).send({ endpoints: data})
})

apiRouter.get('/topics', getTopics)

apiRouter.get('/users', getUsers)

articlesRouter.get('', getArticles)

articlesRouter.route('/:article_id')
    .get(getArticles)
    .patch(patchArticle)

articlesRouter.route('/:article_id/comments')
    .get(getArticleComments)
    .post(postComment)

apiRouter.delete('/comments/:comment_id', deleteComment)

app.all('*', (req, res) => {
    res.status(404).send({ message: 'Path not found' })
})

app.use(customError)

app.use(internalServerError)

module.exports = app