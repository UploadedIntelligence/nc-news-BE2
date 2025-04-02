\c nc_news_test

\echo '\n All topics\n'
UPDATE articles a SET a.votes = a.votes - 1
WHERE a.article_id = 10
RETURNING *
