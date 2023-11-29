const { con } = require("../db");

const handleNotifications = (message, userId) => {
    const insertNotificationSql = "INSERT INTO notifications (nmessage) VALUES (?)";
    con.query(insertNotificationSql, [message], (error, notificationResults) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });

        }
        const notificationId = notificationResults.insertId;
        const insertUserNotificationSql = "INSERT INTO usernotification (nno, uno) VALUES (?, ?)";
        con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    });
};
module.exports=handleNotifications;