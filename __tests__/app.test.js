const endpointsJson = require("../endpoints.json")
const request = require('supertest')
const db = require('../db/connection')
const app = require('../db/endpoints')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
require('jest-sorted')

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    db.end()
})

describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({body: {endpoints}}) => {
                expect(endpoints).toEqual(endpointsJson);
            });
    });
});

describe("GET /api/topics", () => {
    test("200: Responds with an array of topic objects", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body}) => {
                const {topics} = body
                expect(topics.length).toBe(3);
                topics.forEach(topic => {
                    expect(typeof topic.description).toBe('string')
                    expect(typeof topic.slug).toBe('string')
                })
            });
    })


})

describe("GET /api/articles", () => {
    test("200: Responds with an article object", () => {
        return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({body}) => {
                const {article} = body
                expect(article.article_id).toBe(1)
                expect(typeof article.title).toBe('string')
                expect(typeof article.topic).toBe('string')
                expect(typeof article.author).toBe('string')
                expect(typeof article.body).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.votes).toBe('number')
                expect(typeof article.article_img_url).toBe('string')
                expect(article.comment_count).toBe(11)
            })
    })

    test("200: Responds with an array of article objects", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body}) => {
                const {articles} = body;
                expect(articles.length).toBe(13)
                articles.forEach(article => {
                    expect(typeof article.author).toBe('string')
                    expect(typeof article.title).toBe('string')
                    expect(typeof article.article_id).toBe('number')
                    expect(typeof article.topic).toBe('string')
                    expect(typeof article.created_at).toBe('string')
                    expect(typeof article.votes).toBe('number')
                    expect(typeof article.article_img_url).toBe('string')
                    expect(typeof article.comment_count).toBe('number')
                })
                expect(articles).toBeSortedBy('created_at', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=article_id")
            .expect(200)
            .then(({body}) => {
                const {articles} = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('article_id', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=title")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('title', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=topic")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('topic', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=author")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('author', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('votes', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=article_img_url")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('article_img_url', {descending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=article_id&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('article_id', {ascending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=title&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('title', {ascending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=topic&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('topic', {ascending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=author&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('author', {ascending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=votes&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('votes', {ascending: true})
            })
    })

    test("200: Responds with an array of article objects ordered based on the query", () => {
        return request(app)
            .get("/api/articles?sort_by=article_img_url&order=asc")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(13)
                expect(articles).toBeSortedBy('article_img_url', {ascending: true})
            })
    })

    test("200: Responds with an array of articles which contain a certain string in their topic", () => {
        return request(app)
            .get('/api/articles?topic=ca')
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(1)
                articles.forEach(article => {
                    expect(article.topic.includes('ca')).toBe(true)
                })
            })
    })

    test("200: Responds with an array of articles which contain a certain string in their topic", () => {
        return request(app)
            .get('/api/articles?topic=mit')
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                expect(articles.length).toBe(12)
                articles.forEach(article => {
                    expect(article.topic.includes('mit')).toBe(true)
                })
            })
    })

    test("200: Responds with an array of article objects", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body}) => {
                const {comments} = body;
                expect(comments.length).toBe(11)
                comments.forEach(comment => {
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.body).toBe('string')
                    expect(comment.article_id).toBe(1)

                })
                expect(comments).toBeSortedBy('created_at', {descending: true})
            })
    })

    test("400: Responds with an error if query string is invalid", () => {
        return request(app)
            .get("/api/articles?sort_by=invalid")
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Sort_by must be a valid column')
            })
    })

    test("400: Responds with an error if query string is invalid", () => {
        return request(app)
            .get("/api/articles?order=invalid")
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Order type can only be ASC or DESC')
            })
    })

    test("400: Responds with an error if id is not a number", () => {
        return request(app)
            .get("/api/articles/two")
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Please enter a number for id')
            })
    })

    test("404: Responds with an error if an article with a given id does not exist", () => {
        return request(app)
            .get("/api/articles/333")
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('No items found for id 333')
            })
    })


    test("400: Responds with an error if article id is not a number", () => {
        return request(app)
            .get("/api/articles/one/comments")
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Please enter a number for id')
            })
    })

    test("404: Responds with an error if article id does not exist", () => {
        return request(app)
            .get("/api/articles/333/comments")
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('No items found for id 333')
            })
    })

    test("400: Responds with an array of articles which contain a certain string in their topic", () => {
        return request(app)
            .get('/api/articles?topic=invalid')
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe('There are no article topics that contain \"invalid\"')
            })
    })
})

describe("ANY wrong path", () => {
    test("400: Responds with path not found when invalid url is entered", () => {
        return request(app)
            .get("/api/arpticles")
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Path not found')
            })
    })
})

describe("POST /api/articles/:article_id/comments", () => {
    test("200: Responds with the comment that was posted", () => {
        return request(app)
            .post("/api/articles/2/comments")
            .send({username: "rogersop", body: "Some random text"})
            .expect(201)
            .then(({body}) => {
                const {comment} = body;
                expect(comment.comment_id).toBe(19)
                expect(comment.article_id).toBe(2)
                expect(comment.body).toBe('Some random text')
                expect(comment.votes).toBe(0)
                expect(comment.author).toBe("rogersop")
                expect(typeof comment.created_at).toBe('string')
            })
    })



    test("400: Respond with an error when id is not a number", () => {
        return request(app)
            .post("/api/articles/two/comments")
            .send({username: "rogersop", body: "Some random text"})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Please enter a number for id')
            })
    })

    test("400: Respond with an error when field username is missing", () => {
        return request(app)
            .post("/api/articles/2/comments")
            .send({body: "Some random text"})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Username field is required')
            })
    })

    test("404: Respond with an error when article with given id is not found", () => {
        return request(app)
            .post("/api/articles/222/comments")
            .send({username: "rogersop", body: "Some random text"})
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe("Key (article_id)=(222) is not present in table \"articles\".")
            })
    })

    test("404: Respond with an error when username does not exist", () => {
        return request(app)
            .post("/api/articles/2/comments")
            .send({username: "Trusk", body: "Some random text"})
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Key (author)=(Trusk) is not present in table \"users\".')
            })
    })

})

describe("PATCH /api/articles/:article_id", () => {
    test("200: Respond with the updated article", () => {
        return request(app)
            .patch("/api/articles/2")
            .send({inc_votes: 10})
            .expect(200)
            .then(({body}) => {
                let {article} = body
                expect(article.votes).toBe(10)
                expect(article.article_id).toBe(2)
                expect(typeof article.title).toBe('string')
                expect(typeof article.topic).toBe('string')
                expect(typeof article.author).toBe('string')
                expect(typeof article.body).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.article_img_url).toBe('string')
            })
    })

    test("404: Respond with an error if article id does not exist", () => {
        return request(app)
            .patch("/api/articles/222")
            .send({inc_votes: 10})
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('No items found for id 222')
            })
    })

    test("400: Respond with an error if article id is not a number", () => {
        return request(app)
            .patch("/api/articles/two")
            .send({inc_votes: 10})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Please enter a number for id and vote change')
            })
    })

    test("400: Respond with an error if vote change is not a number", () => {
        return request(app)
            .patch("/api/articles/2")
            .send({inc_votes: "triangle"})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Please enter a number for id and vote change')
            })
    })
})

describe("DELETE /api/comments/:comment_id", () => {
    test("204: Give a response with no content", () => {
        return request(app)
                    .delete('/api/comments/1')
                    .expect(204)
                    .then(({ body })=> {
                        expect(body).toEqual({})
                    })
    })

    test("400: Respond with an error if id is not a number", () => {
        return request(app)
            .delete('/api/comments/one')
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe('Please enter a number for id')
            })
    })

    test("404: Respond with an error if id does not exist", () => {
        return request(app)
            .delete('/api/comments/50')
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe('No comments found with id 50')
            })
    })
})

describe("GET /api/users", () => {
    test("200: Responds with an array of user objects", () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
                const { users } = body
                expect(users.length).toBe(4)
                users.forEach(user => {
                    expect(typeof user.username).toBe('string')
                    expect(typeof user.name).toBe('string')
                    expect(typeof user.avatar_url).toBe('string')
                })
            })
    })
})