const express = require('express')
const data = require('../endpoints.json')
const app = express()
const { getTopics } = require('./controllers/topics.controller')
const { getArticles, getArticleComments, patchArticle} = require('./controllers/articles.controller')
const internalServerError = require('./errors/internal-server-error')
const { customError } = require('./errors/invalid-data-type-error')
const { postComment } = require("./controllers/comments.controller");

app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: data})
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticles)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.use(express.json())

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.all('*', (req, res) => {
    res.status(404).send({ message: 'Path not found' })
})

app.use(customError)

app.use(internalServerError)

module.exports = app