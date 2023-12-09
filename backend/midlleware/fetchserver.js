const jwt = require('jsonwebtoken');  
require('dotenv').config({ path: "../../.env" });
const JWT_Secret = process.env.JWT_Secret;

const fetchserver = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please authentictate by providing the token" });
    }
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.server = data.server;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authentictate by providing the valid token" });
    }
}


module.exports = fetchserver;