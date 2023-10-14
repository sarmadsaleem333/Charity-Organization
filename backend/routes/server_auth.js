require('dotenv').config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
const { con } = require("../db");
const fetchserver = require('../midlleware/fetchserver');


router.post("/login_server", [
    body("email", "Enter a valid email").isEmail(),
    body("password"),
], async (req, res) => {
    const { email, password } = req.body;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        con.query("Select * from server where email =? limit 1", [email], async (error, server) => {
            if (error) {
                return res.send("Error finding server");
            }
            if (server.length == 0) {

                return res.json({ message: "You entered wrong email", success });
            }
            const passwordCompare = await bcrypt.compare(password, server[0].password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please enter the correct Password" });
            }
            const data = {
                server: {
                    id: server[0].server_id
                }
            };
            const authtoken = jwt.sign(data, JWT_Secret);
            success = true;
            res.json({ success, authtoken });
        })

    } catch (error) {
        console.log("Error logging in for the server", error);
        res.status(500).send("Internal server error occurred");
    }
});

router.get("/fetch_server", fetchserver, async (req, res) => {
    try {
        con.query("select name,email,phone,account_title,account_no,amount from server where server_id=?", [req.server.id], (error, result) => {

            if (error) {
                return res.send("Error fetching details");
            }
            res.send(result[0]);
        }
        )
    } catch (error) {
        res.status(500).send("Internal server error occurred");
        console.log(error)
    }
});

router.put("/edit_account_details", fetchserver, [
    body("account_title", "Enter account title").notEmpty(),
    body("account_no", "Enter account title").notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        const { account_title, account_no } = req.body;
        con.query("update server set account_no=? , account_title=? where server_id=?", [account_title, account_no, req.server.id],
            (error, result) => {
                if (error) {
                    return res.send("Error editing details");
                }
                res.json({ message: "Successfully updated the account details"});
            }
        )

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;