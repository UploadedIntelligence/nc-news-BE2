const db = require("../connection")
const { createTopicsTable, insertTopics, createUsersTable, insertUsers,
    createArticlesTable, insertArticles, createCommentsTable, insertComments,
    changeRef } = require('./seed_functions')


const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`DROP TABLE IF EXISTS comments`)
      .then(() => db.query(`DROP TABLE IF EXISTS articles`))
      .then(() => db.query(`DROP TABLE IF EXISTS users`))
      .then(() => db.query(`DROP TABLE IF EXISTS topics`))
      .then(() => db.query(createTopicsTable()))
      .then(() => db.query(createUsersTable()))
      .then(() => db.query(createArticlesTable()))
      .then(() => db.query(createCommentsTable()))
      .then(() => db.query(insertTopics(topicData)))
      .then(() => db.query(insertUsers(userData)))
      .then(() => db.query(insertArticles(articleData)))
      .then((insertedArticles) => {
        const articleIDs = changeRef(insertedArticles.rows, 'title', 'article_id')
        return db.query(insertComments(commentData, articleIDs))
      })
};
module.exports = seed;
