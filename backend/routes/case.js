const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');
const handleNotifications = require("../midlleware/handleNotifications");
const date = new Date();



//notifications functions

//request for applying case
router.post("/apply_case", fetchuser, [
    body("cdescription", "Enter a description of at least 10 characters").isLength({ min: 10 }),
    body("clastdate").notEmpty().withMessage("Enter a valid date").custom((value) => {
        // Custom validation to check if the date is in the "DD-MM-YYYY" format
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(value)) {
            throw new Error("Invalid date format. Please use DD-MM-YYYY.");
        }
        return true;
    }).customSanitizer((value) => {
        // Check if value is defined before splitting
        if (value) {
            const [day, month, year] = value.split('-');
            return new Date(`${year}-${month}-${day}`);
        }
        return null; // or return value, depending on your logic
    }),
    body("camountreq", "Password should be at least 8 characters").notEmpty(),
    body("caccountno", "Mention the account no").notEmpty(),
    body("caccounttitle", "Mention the account title").notEmpty(),
], async (req, res) => {
    const { cdescription, clastdate, camountreq, caccountno, caccounttitle } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        if (!(clastdate >= date)) {
            return res.status(400).json({ error: "Last date should be greater than or equal to the current date" });
        }
        con.query("INSERT INTO cases (cdescription, clastdate, camountreq, caccountno, caccounttitle, uno) VALUES (?,?,?,?,?,?)", [cdescription, clastdate, camountreq, caccountno, caccounttitle, req.user.id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send("Your application has been sent. You would be informed shortly");
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});

//route for getting all my applied cases
router.get("/get_my_apply_cases", fetchuser, async (req, res) => {
    try {

        con.query("Select * from my_applied_cases where uno=(?)", [req.user.id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send(results);
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});

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
                    handleNotifications(`Your case has been approved  with id ${req.params.id}`, user.uno);
                    return res.send(`Your case has been approved  with id ${req.params.id}`);
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Internal server error occurred");
        }

    });

//get all registered cases whose date is not passed it still by server 
router.get("/get_all_registered_cases_by_server", fetchserver
    , async (req, res) => {

        try {
            // Find the user associated with the applied case
            con.query("SELECT * FROM all_registeredcases  WHERE cases.clastdate >= ? and transferstatus=0 ", [date], (error, userResults) => {
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
//get all registered cases whose date is not passed it still by server 
router.get("/get_all_registered_cases_by_user", fetchuser,async (req, res) => {

        try {
            // Find the user associated with the applied case
            con.query("SELECT * FROM all_registeredcases  WHERE cases.clastdate >= ? and transferstatus=0", [date], (error, userResults) => {
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
//getting all applications by a server
router.get("/get_all_applications", fetchserver, async (req, res) => {
    try {
        con.query("select * from my_applied_cases as c natural join users where  c.clastdate>(?)", [date], (error, userResults) => {
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

module.exports = router;
