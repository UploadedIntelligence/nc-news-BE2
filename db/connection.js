const {Pool} = require("pg");

const ENV = process.env.NODE_ENV || 'development'

require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("No PGDATABASE or DATABASE_URL configured")
} else {
    console.log(`Connected to database ${process.env.PGDATABASE}`)
    console.log(`Node env is ${process.env.NODE_ENV}`)
}

const config = {};

if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
}

module.exports = new Pool(config);