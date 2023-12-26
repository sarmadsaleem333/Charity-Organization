const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');
const handleNotifications = require("../midlleware/handleNotifications");
const date = new Date();


// --tested
//route for approving a case by a server 
router.post("/approve_case/:id", fetchserver,
    [
        body("name", "Enter a name of at least 5 characters").isLength({ min: 5 }),
    ]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const response = errors.array();
            return res.status(400).json(response[0].msg);
        }
        const { name } = req.body;
        try {
            // Find the user associated with the applied case
            con.query("SELECT *  FROM cases WHERE cno = ?", [req.params.id], (error, userResults) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Internal server error" });
                }

                if (userResults.length === 0) {
                    return res.status(404).json({ error: "User not found for the specified case" });
                }

                const user = userResults[0];

                // Insert into registeredcases
                con.query("INSERT INTO registeredcases (cno, name) VALUES (?, ?)", [req.params.id, name], (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: "You have already approved this course" });
                    }
                    const registeredCaseId = results.insertId;
                    handleNotifications(`Your case has been approved  with name ${name}. You will reach the transfer amount after being collected.`, user.uno, "user");
                    handleNotifications(`You have approved the case ${name}`, 1, "server");
                    return res.json("You have approved this case.");
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal server error occurred");
        }

    });


// ---tested
//get all registered cases whose date is not passed it still by server 
router.get("/get_all_registered_cases_by_server", fetchserver
    , async (req, res) => {

        try {
            // Find the user associated with the applied case
            con.query("SELECT * FROM cases_shown_for_donation natural join (select uno ,uname from users)  AS userTable  WHERE clastdate >= ? and  amountmade<camountreq ", [date], (error, userResults) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Internal server error" });
                }

                return res.send(userResults);

            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal server error occurred");
        }

    });

// ----tested
//getting all applications by a server
router.get("/get_all_applications", fetchserver, async (req, res) => {
    try {
        con.query("select * from my_applied_cases_unapproved natural join (select uno ,uname from users)  AS userTable  where  clastdate>(?)", [date], (error, userResults) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.send(userResults);

        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});

//route to get the completed cases by the server 
router.get("/get_all_transferred_cases_by_server", fetchserver, async (req, res) => {
    try {
        con.query("select * from transferredcases", [date], (error, userResults) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.send(userResults);

        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});


//-----------tested
//route to get the completed byut not transferred cases
router.get("/get_all_non_transferred_cases_but_completed", fetchserver, async (req, res) => {
    try {
        con.query("select * from registeredcases natural join cases natural join (select uno ,uname from users)  AS userTable  where ( clastdate< ? or camountreq<=amountmade) and transferstatus=0 ", [date], (error, userResults) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.send(userResults);

        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});
//route to made transfer the money to account of the case user which have been made
router.post("/tranfer_case_money/:id", fetchserver, async (req, res) => {

    try {
        con.query(" select * from registeredcases natural join cases  where ( clastdate< ? or camountreq<=amountmade) and transferstatus=0 and  cno=?", [date, req.params.id], (errors, result1) => {

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
                    handleNotifications(`Your case ${result1[0].name} has been transferred to your account by Give Hope Network`, result1[0].uno,"user");
                    handleNotifications(`You have made transaction of amount ${result1[0].amountmade} to case ${result1[0].name}`, 1, "server");

                    res.json(`You have transfered the amount ${result1[0].amountmade} to the case  with ${result1[0].name}`);
                })
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }
});



module.exports = router;
