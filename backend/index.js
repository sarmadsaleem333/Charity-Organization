const { connectToMySql } = require("./db");
const express = require("express");
const app = express();                    //making imports 
const port = 3333;
var cors = require("cors");
const path = require('path');
connectToMySql();


app.use(express.json());

app.use(cors());
app.use('/charity_organization/user_auth', require('./routes/user_auth'));
app.use('/charity_organization/server_auth', require('./routes/server_auth'));
app.use('/charity_organization/case', require('./routes/case'));
app.use('/charity_organization/notification', require('./routes/notification'));


app.listen(port, () => {
    console.log(`Give Hope Network is listening on port http://localhost:${port}`);
});