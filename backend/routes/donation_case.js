const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');
const handleNotifications = require("../midlleware/handleNotifications");
const date = new Date();

//route for charity by users 
router.post("/donate_case/:id", fetchuser,
    [body("amount", "Amount should not be empty").notEmpty(),
    body("accounttitle", "Enter Account Title ").notEmpty(),
    body("accountno", "Enter account no").notEmpty(),
    ], async (req, res) => {
        const { amount, accounttitle, accountno } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const response = errors.array();
            return res.status(400).json(response[0].msg);
        }
        try {
            let caseName;
            if (amount < 100) {
                return res.send("Amount should be atleast Rs.100");
            }
            con.query("INSERT INTO casedonates (uno,cno,amount,accounttitle,accountno) VALUES (?,?,?,?,?)", [req.user.id, req.params.id, amount, accounttitle, accountno], (error, results) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Internal server error" });
                }
                con.query("select * from  registeredcases where cno=(?)", [req.params.id], (error, results2) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: "Internal server error" });
                    }
                    con.query("UPDATE registeredcases SET amountmade =amountmade + (?) WHERE cno = (?)", [amount, req.params.id], (error, resultsN) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ error: "Internal server error" });
                        }
                        con.query("UPDATE server SET samount =samount+ (?) WHERE sno = (?)", [amount, 1], (error, resultsS) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ error: "Internal server error" });
                            }
                            handleNotifications(`You have made donation to ${results2[0].name} of Rs. ${amount}`, req.user.id,"user");
                            return res.send(`You donated for the case ${caseName}`);
                        })
                    })
                })
            });

        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal server error occurred");

        }
    });




module.exports=router;