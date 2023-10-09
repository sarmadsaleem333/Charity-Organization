const { connectToMySql } = require("./db"); 
const express = require("express");
const app = express();                    //making imports 
const port = 3333;
const path = require('path');
connectToMySql();

app.use(express.json());

//define the routes here 


app.listen(port, () => {
    console.log(`My Charity Organization is listening on port http://localhost:${port}`);
});