const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var mysql = require('mysql2');

const JWT_secret = " hbssbwu" // add your secret here


// Route 1: Create a user using Post request "/blogging/auth/createuser". No login required
const pool = mysql.createPool({
    host: "127.0.0.1",  // MySQL server hostname
    user: "root",       // MySQL username
    password: "Ravian#1218", // MySQL password\
    database:"projectsarmad"
});
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").isLength({ min: 11 }),
    body("password", "Password should be at least 8 characters").isLength({ min: 8 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }
    try {
        const { name, email, phone, password } = req.body;

        // Check if the user already exists in the database
        pool.query('SELECT * FROM users WHERE email = ? OR phone = ?', [email, phone], (error, results) => {
            if (error) {
                console.error("Error checking user existence:", error);
                return res.status(500).json({ success, error: "Internal Server Error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ success, error: "User with this email or phone number already exists" });
            }

            // Hash the password using bcrypt
            bcrypt.hash(password, 10, (hashError, hashedPassword) => {
                if (hashError) {
                    console.error("Error hashing password:", hashError);
                    return res.status(500).json({ success, error: "Internal Server Error" });
                }

                // Insert the new user into the database
                pool.query('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', [name, email, phone, hashedPassword], (insertError, result) => {
                    if (insertError) {
                        console.error("Error creating user:", insertError);
                        return res.status(500).json({ success, error: "Internal Server Error" });
                    }

                    const data = {
                        user: {
                            idUser: result.insertId
                        }
                    };

                    const authtoken = jwt.sign(data, JWT_secret);
                    success = true;
                    res.json({ success, authtoken });
                });
            });
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ success, error: "Internal Server Error" });
    }
});

// ... Continue with similar modifications for other routes

module.exports = router;
