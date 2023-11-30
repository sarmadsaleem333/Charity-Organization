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
                            handleNotifications(`You have made donation to ${results2[0].name}`, req.user.id);
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

//route to get cases which are completed and server has not still transferred them
router.get("/get_nontransfered_cases", fetchserver, async (req, res) => {

    try {
        con.query("select * from registeredcases natural join cases  where (clastdate<(?) or amountmade=camountreq )and  transferstatus=0 ", [date], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Internal server error occurred");
            }
            res.send(results);

        })
    } catch (error) {

        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});

//route to made transfer the money to account of the case user which have been made
router.post("/tranfer_case_money/:id", fetchserver, async (req, res) => {

    try {
        con.query("select * from cases natural join registeredcases where cno=?", [req.params.id], (errors, result1) => {

            if (errors) {
                console.log(errors);
                return res.status(500).send("Internal server error occurred");
            }
            if (result1[0].length == 0) {
                return res.send("No case found.");
            }
            con.query("UPDATE server SET samount =samount- (?) WHERE sno = (?)", [result1[0].amountmade, 1], (error, result2) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send("Internal server error occurred");
                }
                con.query("update registeredcases set transferstatus= 1 where cno= ? ", [req.params.id], (error, result3) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send("Internal server error occurred");
                    }
                    handleNotifications(`Your case ${result1[0].name} has been resolved`,result1[0].uno);
                    res.send(`You have transfered the amount ${result1[0].amountmade} to the case`);
                })
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }
});

//route for getting all the donations for a particular case  by server and the person who made this details
router.get("/get_donation_details/:id",fetchserver,async(req,res)=>{
    try {
        
    } catch (error) {
        
    }

});

module.exports=router;