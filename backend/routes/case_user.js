const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');
const handleNotifications = require("../midlleware/handleNotifications");
const date = new Date();

//---tested----------------------------
//request for applying case
router.post("/apply_case", fetchuser, [
    body("cdescription", "Enter a description of at least 10 characters").isLength({ min: 10 }),

    body("clastdate")
        .notEmpty().withMessage("Enter a valid date")
        .custom((value) => {
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            if (!dateRegex.test(value)) {
                throw new Error("Invalid date format. Please use DD-MM-YYYY.");
            }

            const [day, month, year] = value.split('-');
            const dateObject = new Date(`${year}-${month}-${day}`);

            // Check if the dateObject is a valid date (accounting for invalid dates like month 13)
            if (isNaN(dateObject.getTime())) {
                throw new Error("Invalid date. Please provide a valid date.");
            }

            return true;
        })
        .customSanitizer((value) => {
            if (value) {
                const [day, month, year] = value.split('-');
                return new Date(`${year}-${month}-${day}`);
            }
            return null;
        }),
    body("camountreq", "Password should be at least 8 characters").notEmpty(),
    body('caccountno')
        .isLength({ min: 8, max: 12 })
        .withMessage('Account number must be between 8 and 12 characters'),
    body("caccounttitle", "Mention the account title").notEmpty(),
], async (req, res) => {
    const { cdescription, clastdate, camountreq, caccountno, caccounttitle } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        if (!(clastdate > date)) {
            return res.status(400).json({ error: "Last date should be greater the current date" });
        }
        con.query("INSERT INTO cases (cdescription, clastdate, camountreq, caccountno, caccounttitle, uno) VALUES (?,?,?,?,?,?)", [cdescription, clastdate, camountreq, caccountno, caccounttitle, req.user.id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            handleNotifications(`Your application for your case has been sent`, req.user.id, "user");
            return res.json("Your application has been sent. You would be informed shortly");
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});

//route for getting all my transferred cases
router.get("/get_my_transferredcases", fetchuser, async (req, res) => {
    try {

        con.query("select * from transferredcases where uno=(?)", [req.user.id], (error, results) => {
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

// --tested
//route for getting all my inprogress cases
router.get("/get_my_inprogress_cases", fetchuser, async (req, res) => {
    try {

        con.query("select * from inprogress_cases_of_user where uno=(?)", [req.user.id], (error, results) => {
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

// --tested
//route for getting my  applied cases which are not approved
router.get("/get_my_applied_unapproved_cases", fetchuser, async (req, res) => {
    try {

        con.query("select * from my_applied_cases_unapproved where uno=(?)", [req.user.id], (error, results) => {
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
// --tested
//get all registered cases whose date is not passed it still by server 
router.get("/get_all_registered_cases_by_user", fetchuser, async (req, res) => {

    try {
        // Find the user associated with the applied case
        con.query("SELECT * FROM cases_shown_for_donation  WHERE clastdate >= ? and  amountmade<camountreq", [date], (error, userResults) => {
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