const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const fetchserver = require('../midlleware/fetchserver');
const multer = require("multer");
const handleNotifications = require("../midlleware/handleNotifications");
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

//router for uplpading an item
router.post('/upload_item',

    [
        body('iquantity', 'Quantity should be a positive integer'),
        body('iname', 'Item name is required'),
        body('iprice', 'Price should be a positive decimal number')], 
        upload.single('iphoto'), 
        fetchserver, 
        async (req, res) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const response = errors.array();
                return res.status(400).json(response[0].msg);
            }
            const { iquantity, iname, iprice } = req.body;
            const imageName = req.file.filename;
            try {
                con.query('INSERT INTO items (iquantity, iname, iphoto, iprice) VALUES (?, ?, ?, ?)', [iquantity, iname, imageName, iprice], (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    return res.status(201).json({ message: 'Item uploaded successfully', insertedId: result.insertId });
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });


//router for updating the quantity
router.post('/edit_quantity/:id',
    [body('iquantity', 'Quantity should be a positive integer').isInt({ min: 1 }),
    ], fetchserver, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const response = errors.array();
            console.log(response[0].msg)
            return res.status(400).json(response[0].msg);
        }
        const { iquantity } = req.body;

        try {
            con.query('Update items SET iquantity = ? WHERE ino = ?', [iquantity, req.params.id], (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
            });
            return res.json("Your quantity  has been successfully updated");
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });

//router for getting all items by server 
router.get("/get_items_by_server", fetchserver, async (req, res) => {
    try {

        con.query("SELECT * FROM items ", (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }

            // Send the retrieved items as a response
            return res.send(results);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});
//route for getting all items by user
router.get("/get_items_by_user", fetchuser, async (req, res) => {
    try {

        con.query("SELECT * FROM items ", (error, results) => {
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

//donation of item
router.post("/donate_item/:id", fetchuser, [
    body("quantity", "Quantity should be at least 1").isInt({ min: 1 }),
], async (req, res) => {
    const { quantity } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = errors.array();
        return res.status(400).json(response[0].msg);
    }

    try {

        // Insert into itemdonates
        con.query("Select * from items where ino=?", [req.params.id], (errors, result0) => {

            if (errors) {
                console.log(errors);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (result0.length===0){
                return res.json("No item found")
            }
            if (result0[0].quantity < quantity) {
                return res.json("Sorry this much quantity is not available");
            }
            con.query("INSERT INTO itemdonates (uno, ino, idate, amount, quantity) VALUES (?, ?, ?, ?, ?)",
                [req.user.id, req.params.id, date, result0[0].iprice * quantity, quantity],
                (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: "Internal server error" });
                    }

                    // Update quantity in items table
                    con.query("UPDATE items SET iquantity = iquantity - ? WHERE ino = ?", [quantity, req.params.id], (error, resultsQ) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ error: "Internal server error" });
                        }

                        // Update server amount
                        con.query("UPDATE server SET samount = samount + ? WHERE sno = 1", [result0[0].iprice * quantity], (error, resultsS) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ error: "Internal server error" });
                            }

                            handleNotifications(`You have donated ${quantity} ${result0[0].iname} with Rs ${result0[0].iprice * quantity}.`, req.user.id,"user");
                            return res.json("Your item donation has been successfully recorded.");
                        });
                    });
                }
            );
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");
    }
});


// get all non transfer details
router.get("/all_non_transfer_items", fetchserver, async (req, res) => {
    try {
        con.query("select * from itemdonates natural join (select uname ,uno from users) as usertable natural join items where transferstatus=0", (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send(result);

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }

});
// get all  transfer details
router.get("/all_transfer_items", fetchserver, async (req, res) => {
    try {
        con.query("select * from itemdonates natural join (select uname ,uno from users) as usertable natural join items where transferstatus=1", (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send(result);
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }

});
router.post("/transfer_item/:id", fetchserver, async (req, res) => {
    try {
        con.query("update itemdonates set transferstatus=1 where receiptno=?", [req.params.id], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
        handleNotifications("You have transferred the items", 1, "server");
        res.json("You have successfully transferred the items")

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }

})
router.get("/all_donations_by_server", fetchserver, async (req, res) => {
    try {
        con.query("select * from itemdonates natural join (select uname ,uno from users) as usertable natural join items where transferstatus=1 ",  (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send(result)
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }

})
router.get("/all_donations_by_user", fetchuser, async (req, res) => {
    try {
        con.query("select * from itemdonates natural join (select uname ,uno from users) as usertable natural join items where uno= ?", [req.user.id], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.send(result)
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error occurred");

    }

})
module.exports = router;