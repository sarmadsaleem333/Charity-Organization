require('dotenv').config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const date = new Date();

const isValidDateFormat = (dateString) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(dateString);
};

router.post("/apply_case", fetchuser, [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("description", "Enter description of minimum 10  words").isLength({ min: 10 }),
    body("photo_link", "Enter the photolink"),
    body("last_date", "Enter the date in (YYYY-MM-DD)").custom((value) => {
        if (!isValidDateFormat(value)) {
            throw new Error("Date must be in the YYYY-MM-DD format");
        }
        const inputDate = new Date(value); 
        if (inputDate<=date) {
            throw new Error("Date has been passed");
        }
        return true;
    }), body("account_title", "Account Title should be atleast 8 characters").isLength({ min: 8 }),
    body("account_no", "Account number be atleast 11 numbers").isLength({ min: 8 }),
    body("amount_required", "Enter amount required").notEmpty()
],
    async (req, res) => {
        const { name, description, photo_link, last_date, account_title, account_no, amount_required } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const response = errors.array();
            return res.status(400).json(response[0].msg);
        }
        try {
            con.query("Insert into applied_cases (user_id ,name, description, photo_link, last_date, account_title, account_no, amount_required) values(?,?,?,?,?,?,?,?)", [req.user.id, name, description, photo_link, last_date, account_title, account_no, amount_required, amount_required], async (error, server) => {
                if (error) {
                    console.log(error);
                    return res.send("Error applying for the case");
                }

                const applied_case_id = server.insertId;

                con.query("Insert into user_notifications (user_id,message,applied_case_id) values(?,?,?)",[req.user.id,"Your application for this case has been sent.You will be informed shortly. ",applied_case_id ],async (error, server) =>{

                    if (error) {
                        console.log(error);
                        return res.send("Error in notification");
                    }
                    return res.send("Your application has been sent");
                })
            })

        } catch (error) {
            console.log("Error logging in for the server", error);
            res.status(500).send("Internal server error occurred");
        }
    });




module.exports = router;
