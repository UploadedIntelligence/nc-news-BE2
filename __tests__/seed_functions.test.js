const { createTopicsTable, insertTopics, createUsersTable, insertUsers,
    createArticlesTable, insertArticles, createCommentsTable, insertComments,
    changeRef } = require("../db/seeds/seed_functions");

describe("createTopicsTable", () => {
    test("returns a string that creates a table with specific parameters", () => {
        const actual = createTopicsTable();
        const expected = `CREATE TABLE topics(
            slug VARCHAR UNIQUE PRIMARY KEY NOT NULL,
            description VARCHAR NOT NULL,
            img_url VARCHAR(1000) NOT NULL)`
        expect(actual).toBe(expected);
    });

})