\c nc_news_test

SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url,
       (SELECT COUNT(*) FROM comments c WHERE c.article_id = a.article_id) comment_count
FROM articles a
ORDER BY a.created_at desc



