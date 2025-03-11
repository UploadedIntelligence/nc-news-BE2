const format = require('pg-format')

function createTopicsTable() {
    return `CREATE TABLE topics(
            slug VARCHAR UNIQUE PRIMARY KEY NOT NULL,
            description VARCHAR NOT NULL,
            img_url VARCHAR(1000) NOT NULL)`
}

function insertTopics(topicData) {
    const formattedTopics = topicData.map(topic => {
        return [topic.slug, topic.description, topic.img_url]
    })
    return format(`INSERT INTO topics(slug, description, img_url)
        VALUES %L`, formattedTopics)
}

function createUsersTable() {
    return `CREATE TABLE users(
            username VARCHAR PRIMARY KEY UNIQUE,
            name VARCHAR,
            avatar_url VARCHAR(1000)
            )`
}

function insertUsers(userData) {
    const formattedUsers = userData.map(user => {
        return [user.username, user.name, user.avatar_url]
    })

    return format(`INSERT INTO users(username, name, avatar_url)
        VALUES %L`, formattedUsers)
}

function createArticlesTable() {
    return `CREATE TABLE articles(
            article_id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            topic VARCHAR REFERENCES topics(slug),
            author VARCHAR REFERENCES users(username),
            body TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            votes INT DEFAULT 0,
            article_img_url VARCHAR(1000)
            )`
}

function insertArticles(articleData) {
    const formattedArticles = articleData.map(article => {
        return [article.title, article.topic, article.author,
        article.body, new Date(article.created_at) , article.votes, article.article_img_url]
    })

    return format(`INSERT INTO articles
        (title, topic, author, body, created_at, votes, article_img_url)
        VALUES %L RETURNING *`, formattedArticles)
}

function createCommentsTable() {
    return `CREATE TABLE comments(
            comment_id SERIAL PRIMARY KEY,
            article_id INT REFERENCES articles(article_id),
            body TEXT,
            votes INT DEFAULT 0,
            author VARCHAR REFERENCES users(username),
            created_at TIMESTAMP DEFAULT NOW()
            )`
}

function insertComments(commentData, articleIDs) {
    const formattedComments = commentData.map(comment => {
        return [articleIDs[comment.article_title], comment.body,
        comment.votes, comment.author, new Date(comment.created_at)]
    })

    return format(`INSERT INTO comments
        (article_id, body, votes, author, created_at)
        VALUES %L RETURNING *`, formattedComments)
}

function changeRef(arrOfObj, key1, key2 ) {
    return arrOfObj.reduce((accum, obj) => {
        accum[obj[key1]] = obj[key2]
        return accum
    }, {})
}

module.exports = { createTopicsTable, insertTopics, createUsersTable, insertUsers,
    createArticlesTable, insertArticles, createCommentsTable, insertComments, changeRef }