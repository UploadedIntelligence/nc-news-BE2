\c nc_news

\echo '\n All topics \n'
SELECT * FROM topics;

\echo '\n All users \n'
SELECT * FROM users;

\echo '\n All articles with topic "coding" \n'
SELECT * FROM articles
WHERE topic = 'coding';

\echo '\n All comments where votes are less than 0 \n'
SELECT * FROM comments
WHERE votes < 0;

\echo '\n All articles by user "grumpy19" \n'
SELECT * FROM articles
WHERE author = 'grumpy19';

\echo '\n All comments that have more than 10 votes \n'
SELECT * FROM comments
WHERE votes > 10;