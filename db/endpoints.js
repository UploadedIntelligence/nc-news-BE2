const express = require('express')
const data = require('../endpoints.json')
const app = express()
const { getTopics } = require('./controllers/topics.controller')
const { getArticles } = require('./controllers/articles.controller')
const internalServerError = require('./errors/internal-server-error')
const { customError } = require('./errors/invalid-data-type-error')

app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: data})
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticles)

app.use(customError)

app.use(internalServerError)

module.exports = app