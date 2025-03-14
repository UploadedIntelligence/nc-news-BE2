# NC News

### Link to hosted version - https://nc-news-be2.onrender.com/api

### Summary

<p>The project contains all the necessary JavaScript logic to create a local express server which creates a connection to a<br>
PostgreSQL database using "pg.Pool()" that is populated with the data from db/data directory. This data is then used to make<br>
psql queries to our pool. Express is used to define the endpoints and serve the information based on the requested URL.
</p>

### DB Setup

- Make sure you have PostgreSQL and Node installed. This repo uses psql v16.6 and Node v22.12.0
- Clone the repo using `git clone https://github.com/UploadedIntelligence/nc-news-BE2.git`
- Run `npm install` to install all dependencies
- Create .env.development and .env.test files in the main directory
- Each of these should contain `PGDATABASE=nc_news` and `PGDATABASE=nc_news_test` respectively.
- If the user has a password also add `PGPASSWORD=your_password` below it.
- Run `npm run setup-dbs` to create the database, then "npm run seed-dev" to populate it with the data
- Run `npm run test` to make sure there are no errors
