const express = require("express");
const router = express.Router();
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');

//user getting his all donations 
router.get("/get_all_donations_by_user", fetchuser, async (req, res) => {
    try {
        con.query("SELECT receiptno,date,amount,accounttitle,name FROM user_donations_for_cases  where uno=?", [req.user.id], (error, results) => {
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
})

//get specific donations details by server
router.get("/get_specific_case_donations_by_server/:id", fetchserver, async (req, res) => {
    try {
        con.query("select cno,uname,uno,receiptno,name,amount,accounttitle,date from transferredcases natural join casedonates natural join users where cno=? ", [req.params.id], (error, results) => {
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