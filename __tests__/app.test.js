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