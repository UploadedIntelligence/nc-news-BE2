const { queryTopics } = require('../models/topics.model')

function getTopics(req, res) {
    return queryTopics().then(result => {
        res.status(200).send({topics: result})
    })
}

module.exports = { getTopics }