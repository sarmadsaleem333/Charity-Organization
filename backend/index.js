const { connectToMySql } = require("./db");
const express = require("express");
const app = express();                     
const port = 3333;
var cors = require("cors");
const path = require('path');
connectToMySql();


app.use(express.json());

app.use(cors());
app.use('/charity_organization/user_auth', require('./routes/user_auth'));
app.use('/charity_organization/server_auth', require('./routes/server_auth'));
app.use('/charity_organization/case_server', require('./routes/case_server'));
app.use('/charity_organization/donation_case', require('./routes/donation_case'));
app.use('/charity_organization/notification', require('./routes/notification'));
app.use('/charity_organization/donation_item', require('./routes/donation_item'));
app.use('/charity_organization/get_history_of_donations', require('./routes/get_history_of_donations'));
app.use('/charity_organization/case_user', require('./routes/case_user'));
app.use('/charity_organization/events', require('./routes/events'));
app.use(express.static(path.resolve(__dirname, './public')));

app.listen(port, () => {
    console.log(`Give Hope Network is listening on port http://localhost:${port}`);
});