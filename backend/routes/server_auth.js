require('dotenv').config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
const { con } = require("../db");
const fetchserver = require('../midlleware/fetchserver');


// router.post("/login_server", [
//     body("email", "Enter a valid email").isEmail(),
//     body("password"),
// ], async (req, res) => {
//     const { email, password } = req.body;
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const response = errors.array();
//         return res.status(400).json(response[0].msg);
//     }
//     try {
//         con.query("Select * from server where smail =? limit 1", [email], async (error, server) => {
//             if (error) {
//                 return res.send("Error finding server");
//             }
//             if (server.length == 0) {

//                 return res.json({ message: "You entered wrong email", success });
//             }
//             const passwordCompare = await bcrypt.compare(password, server[0].spassword);
//             if (!passwordCompare) {
//                 return res.status(400).json({ success, error: "Please enter the correct Password" });
//             }
//             const data = {
//                 server: {
//                     id: server[0].sno
//                 }
//             };
//             const authtoken = jwt.sign(data, JWT_Secret);
//             success = true;
//             res.json({ success, authtoken });
//         })

//     } catch (error) {
//         console.log("Error logging in for the server", error);
//         res.status(500).send("Internal server error occurred");
//     }
// });
router.post("/login_server", [
    body("email", "Enter a valid email").isEmail(),
    body("password").notEmpty().withMessage('Password is required'),
], async (req, res) => {
    role="server";
    const { email, password } = req.body;
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }

    try {
        con.query("SELECT * FROM server WHERE smail = ? LIMIT 1", [email], async (error, server) => {
            if (error) {
                return res.send("Error finding server");
            }

            if (server.length === 0) {
                return res.json({ message: "You entered wrong email", success });
            }

            const passwordCompare = await bcrypt.compare(password, server[0].spassword);

            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please enter the correct Password" });
            }

            const data = {
                server: {
                    id: server[0].sno,
                }
            };

            const authtoken = jwt.sign(data, JWT_Secret);

            success = true;

            res.json({ success, authtoken,role });
        });

    } catch (error) {
        console.log("Error logging in for the server", error);
        res.status(500).send("Internal server error occurred");
    }
});


router.get("/fetch_server", fetchserver, async (req, res) => {
    try {
        con.query("select sname,smail,saccounttitle,sacccountno,samount from server where sno=?", [req.server.id], (error, result) => {

            if (error) {
                console.log(error);
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
    body("account_no", "Enter account no").notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        const { account_title, account_no } = req.body;
        con.query("update server set sacccountno=? , saccounttitle=? where sno=?", [ account_no,account_title, req.server.id],
            (error, result) => {
                if (error) {
                    return res.json("Error editing details");
                }
                res.json( "Successfully updated the account details" );
            }
        )

    }
    catch (error) {
        console.log(error);
    }
});


router.put("/edit_balance", fetchserver, [
    body("amount", "Enter amount in Rs.").notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        const { amount } = req.body;
        con.query("update server set samount=? where sno=?", [amount, req.server.id],
            (error, result) => {
                if (error) {
                    return res.send("Error editing amount");
                }
                res.json({ message: "Successfully updated the amount" });
            }
        )

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;