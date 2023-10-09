const mysql = require('mysql2');
require('dotenv').config({ path: "../.env" });

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

module.exports = { con, connectToMySql };
