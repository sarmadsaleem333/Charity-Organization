const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');
const handleNotifications = require("../midlleware/handleNotifications");
const multer = require("multer");
const date = new Date();

//storing in backend/public/images/
var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: imageStorage })

router.post("/upload_event",
    [body('eventname', 'Event name should be 6 characters').isLength({ min: 6 }),
    body("eventdate")
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
    body('description', 'Please enter description of atleast 10 letters').isLength({ min: 10 }),
    body("volunteers_no", "Enter a valid number").isInt(),
    upload.single('photolink'),
    ],
    fetchserver,
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response = errors.array();
            return res.status(400).json(response[0].msg);
        }
        const { eventname, eventdate, description, volunteers_no } = req.body;
        const photolink = req.file.filename;
        try {
            con.query('INSERT INTO events (eventname, eventdate, description,volunteers_no,photolink) VALUES (?, ?, ?,?, ?)', [eventname, eventdate, description, volunteers_no, photolink], (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                return res.status(201).json({ message: 'Event uploaded successfully', insertedId: result.insertId });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });


router.post("/volunteer_for_event/:id", fetchuser, async (req, res) => {
    let eventN;
    try {
        con.query("select * from events where eventno=?", [req.params.id], (error, result) => {
            eventN=result[0].eventname;
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });

            }
            if (result[0].current_volunteers >= result[0].volunteers_no) {
                return res.json("Volunteers are completed")
            }
            con.query("select * from worksonevent where uno=? and eventno=?", [req.user.id, req.params.id], (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (result.length > 0) {
                    return res.json("You are already volunteered for this event")
                }

                con.query("INSERT INTO worksonevent (uno, eventno) VALUES (?, ?)", [req.user.id, req.params.id], (error, result1) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    
                    handleNotifications(`You are volunteered for event ${eventN}`, req.user.id, "user");

                    // Update event and increase current volunteers count
                    con.query("UPDATE events SET current_volunteers = current_volunteers + 1 WHERE eventno = ?", [req.params.id], (error, result2) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        return res.json("You are volunteered for this event");
                    });
                });

            })
        })

    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });

    }
});

router.get("/get_events_by_user", fetchuser, async (req, res) => {
    try {
        con.query("select * from events where eventdate>?", [date], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });

            }
            return res.send(result);

        })
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });

    }
});
router.get("/get_events_by_server", fetchserver, async (req, res) => {
    try {
        con.query("select * from events where eventdate>?", [date], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });

            }
            return res.send(result);

        })
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });

    }
});
router.get("/get_volunteers_for_event/:id", fetchserver, async (req, res) => {
    try {
        con.query("select * from worksonevent natural join (select uno,uname from users) as usertable where eventno=?", [req.params.id], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });

            }
            return res.send(result);

        })
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });

    }
});

router.get("/get_all_my_events", fetchuser, async (req, res) => {
    try {
        con.query("select * from worksonevent natural join (select uno,uname from users) as usertable natural join events where uno=? and eventdate>=?", [req.user.id, date], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });

            }
            return res.send(result);

        })
    } catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });

    }
});
module.exports = router;