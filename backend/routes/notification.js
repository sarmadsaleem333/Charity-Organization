const express = require("express");
const router = express.Router();
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');

//get all notifications by the user(only of him) 
router.get("/get_notifications_by_user", fetchuser, async (req, res) => {
    try {
        con.query(" ", [req.user.id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(results);
        }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }
});

// get all the notifications by the server
router.get("/get_notifications_by_server", fetchserver, async (req, res) => {
    try {
        con.query("SELECT  from nmessage getNotifications_for_server where sno=?", [req.server.id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send(results);
        }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }
});

module.exports = router;

