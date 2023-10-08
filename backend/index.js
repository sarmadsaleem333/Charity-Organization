// const mysql = require('mysql2');
// require('dotenv').config(); // Load environment variables from .env file

// // Create a connection to the MySQL server
// const con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
// });

// const connectToMySql = () => {
//     con.connect(function (err) {
//         if (err) {
//             console.error('Error connecting to MySQL:', err);
//             throw err;
//         }
//         console.log("Connected to MySQL!");
//     });
// }

// module.exports = connectToMySql;
const connectToMySql = require("./db");
const express = require("express");
const app = express();                    //making imports 
const port = 3333;
const path = require('path');
connectToMySql();

app.use(express.json());

app.use('/blogging/auth', require('./Routes/auth'));       //providing route for authentication 

app.listen(port, () => {
    console.log(`My Blogging App is listening on port http://localhost:${port}`);
});