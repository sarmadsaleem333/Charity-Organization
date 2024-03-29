require('dotenv').config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');

//create user route
// .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/, "g"),
router.post("/create_user", [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be at least 8 characters")
        .isLength({ min: 8 }),
        // .matches(/^(?=.*\d)(?=.*[!@#$%^&*])/, "Password must contain at least one number and one special character"),
    body("status", "Enter your status").notEmpty(),
    body("phone", "Phone number should be of 11 characters").isLength(11),
], async (req, res) => {
    const { name, email, password, status, phone } = req.body;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.json(response[0].msg);
    }
    try {
        // Check if a user with the same email or phone already exists
        con.query("SELECT * from users WHERE uemail = ? or uphone=? ", [email, phone], (error, results) => {
            if (error) {
                console.log(error)
                console.log("Error finding user");
                return res.status(500).json({ error: "Internal server error", success });
            }

            if (results.length > 0) {
                return res.status(400).send("A user with this email or phone already exists. Please use another email or phone.");
            }


            // Hash the password using bcrypt.js
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log("Error generating salt");
                    return res.status(500).json({ error: "Internal server error", success });
                }
                bcrypt.hash(req.body.password, salt, (err, secPass) => {
                    if (err) {
                        console.log("Error hashing password");
                        return res.status(500).json({ error: "Internal server error", success });
                    }
                    con.query("INSERT INTO users (uname, uemail,ustatus, upassword,uphone) VALUES (?,?,?,?,?)", [name, email, status, secPass, phone], (error, result) => {
                        if (error) {
                            console.log("Error creating a user", error);
                            return res.status(500).json({ error: "Internal server error", success });
                        }

                        const data = {
                            user: {
                                idUser: result.insertId,
                            }
                        };

                        const authtoken = jwt.sign(data, JWT_Secret);
                        success = true;
                        res.json({ success, authtoken });
                    });
                });
            });
        });
    } catch (error) {
        console.log("Error creating user", error);
        res.status(500).send("Internal server error occurred");
    }
});

// login route
// router.post("/login_user", [
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
//         con.query("Select * from users where uemail =? limit 1", [email], async (error, user) => {
//             if (error) {
//                 return res.send("Error finding user");
//             }
//             if (user.length == 0) {

//                 return res.json({ message: "No user found with this email", success });
//             }
//             const passwordCompare = await bcrypt.compare(password, user[0].upassword);
//             if (!passwordCompare) {
//                 return res.status(400).json({ success, error: "Please enter the correct Password" });
//             }
//             const data = {
//                 user: {
//                     id: user[0].uno
//                 }
//             };
//             const authtoken = jwt.sign(data, JWT_Secret);
//             success = true;
//             res.json({ success, authtoken });
//         })

//     } catch (error) {
//         console.log("Error logging in...", error);
//         res.status(500).send("Internal server error occurred");
//     }
// });


router.post("/login_user", [
    body("email", "Enter a valid email").isEmail(),
    body("password").notEmpty().withMessage('Password is required'),
], async (req, res) => {
    const role="user"
    const { email, password } = req.body;
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }

    try {
        con.query("SELECT * FROM users WHERE uemail = ? LIMIT 1", [email], async (error, user) => {
            if (error) {
                return res.send("Error finding user");
            }

            if (user.length === 0) {
                return res.json({ message: "No user found with this email", success });
            }

            const passwordCompare = await bcrypt.compare(password, user[0].upassword);

            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please enter the correct Password" });
            }

            const data = {
                user: {
                    id: user[0].uno,
                }
            };

            const authtoken = jwt.sign(data, JWT_Secret);

            success = true;

            res.json({ success, authtoken,role});
        });

    } catch (error) {
        console.log("Error logging in...", error);
        res.status(500).send("Internal server error occurred");
    }
});


//fetch user details here 
router.get("/fetch_user", fetchuser, async (req, res) => {
    try {
        con.query("select uname,uemail,ustatus, uphone from users where uno=?", [req.user.id], (error, result) => {

            if (error) {
                return res.send("Error fetching details");
            }
            console.log(req.user.id)
            res.send(result[0]);
        }
        )
    } catch (error) {
        res.status(500).send("Internal server error occurred");
        console.log(error)
    }
});

router.post("/change_password", [
    body("oldPassword", "Old password should be at least 8 characters").isLength({ min: 8 }),
    body("newPassword", "New password should be at least 8 characters").isLength({ min: 8 }),
], fetchuser, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    let success = false;

    // Additional validation if needed

    try {
        const user = req.user;

        // Compare the provided old password with the stored hashed password
        bcrypt.compare(oldPassword, user.upassword, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json("Invalid old password.");
            }

            // Hash the new password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log("Error generating salt");
                    return res.status(500).json({ error: "Internal server error", success });
                }

                bcrypt.hash(newPassword, salt, (err, secPass) => {
                    if (err) {
                        console.log("Error hashing new password");
                        return res.status(500).json({ error: "Internal server error", success });
                    }

                    // Update the user's password in the database
                    con.query("UPDATE users SET upassword = ? WHERE uid = ?", [secPass, user.uid], (error) => {
                        if (error) {
                            console.log("Error updating password");
                            return res.status(500).json({ error: "Internal server error", success });
                        }

                        success = true;
                        res.json({ success, message: "Password updated successfully." });
                    });
                });
            });
        });
    } catch (error) {
        console.log("Error changing password", error);
        res.status(500).send("Internal server error occurred");
    }
});


module.exports = router;
