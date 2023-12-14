// const { con } = require("../db");

// const handleNotifications = (message, userId, string) => {
//     const insertNotificationSql = "INSERT INTO notifications (nmessage) VALUES (?)";
//     con.query(insertNotificationSql, [message], (error, notificationResults) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: "Internal server error" });

//         }
//         const notificationId = notificationResults.insertId;
//         if (string=="user"){
//         const insertUserNotificationSql = "INSERT INTO usernotification (nno, uno) VALUES (?, ?)";
//         con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ error: "Internal server error" });
//             }
//         });
//     }
//     else{
//         const insertUserNotificationSql = "INSERT INTO servernotification (nno, sno) VALUES (?, ?)";
//         con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ error: "Internal server error" });
//             }
//         });
//     }
//     });
// };
// module.exports=handleNotifications;

const { con } = require("../db");

const handleNotifications = (message, userId, string, res) => {
    const insertNotificationSql = "INSERT INTO notifications (nmessage) VALUES (?)";

    con.query(insertNotificationSql, [message], (error, notificationResults) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }

        // Check if notificationResults is defined and has the expected property
        if (notificationResults && notificationResults.insertId !== undefined) {
            const notificationId = notificationResults.insertId;

            // Use a ternary operator for simplicity
            const insertUserNotificationSql = (string === "user") ?
                "INSERT INTO usernotification (nno, uno) VALUES (?, ?)" :
                "INSERT INTO servernotification (nno, sno) VALUES (?, ?)";

            con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Internal server error" });
                }

                // Send a success response if everything is fine
                return res.status(200).json({ message: "Notification inserted successfully" });
            });
        } else {
            console.error("Error: InsertId not found in notificationResults");
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};

module.exports = handleNotifications;
