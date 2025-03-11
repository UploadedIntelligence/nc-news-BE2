const express = require('express')
const data = require('../endpoints.json')
const app = express()
const { getTopics } = require('./controllers/topics.controller')
const internalServerError = require('./errors/internal-server-error')

app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: data})
})

app.get('/api/topics', getTopics)

app.use(internalServerError)

module.exports = app