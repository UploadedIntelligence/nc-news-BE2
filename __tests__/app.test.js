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
      .then(({ body: { endpoints } }) => {
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
            .get("/api/articles/2")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body
                const article = articles[0]
                expect(articles.length).toBe(1)
                expect(article.article_id).toBe(2)
                expect(typeof article.title).toBe('string')
                expect(typeof article.topic).toBe('string')
                expect(typeof article.author).toBe('string')
                expect(typeof article.body).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.votes).toBe('number')
                expect(typeof article.article_img_url).toBe('string')
            })
    })

    test("400: Responds with an error if id is not a number", () => {
        return request(app)
            .get("/api/articles/two")
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe('Please enter a number for id')
            })
    })

    test("400: Responds with an error if an article with a given id does not exist", () => {
        return request(app)
            .get("/api/articles/333")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe('Could not find an article with id 333')
            })
    })
})