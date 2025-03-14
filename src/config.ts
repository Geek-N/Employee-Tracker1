import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const client = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Connection error', err.stack));

export { client };