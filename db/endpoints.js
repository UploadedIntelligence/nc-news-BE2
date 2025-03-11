const express = require('express')
const data = require('../endpoints.json')
const app = express()

app.get('/api', (req, res) => {
    res.status(200).send({ endpoints: data})
})

module.exports = app