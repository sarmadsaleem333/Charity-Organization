const mysql = require('mysql2');
require('dotenv').config({path:"../.env"}); // Load environment variables from .env file


const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const connectToMySql = () => {
    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            throw err;
        }
        console.log("Connected to MySQL!");
    });
}

module.exports = connectToMySql;
