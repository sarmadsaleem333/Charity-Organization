const { con } = require("../db");

const handleNotifications = (message, userId, string) => {
    const insertNotificationSql = "INSERT INTO notifications (nmessage) VALUES (?)";
    con.query(insertNotificationSql, [message], (error, notificationResults) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });

        }
        const notificationId = notificationResults.insertId;
        if (string=="user"){
        const insertUserNotificationSql = "INSERT INTO usernotification (nno, uno) VALUES (?, ?)";
        con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    else{
        const insertUserNotificationSql = "INSERT INTO servernotification (nno, sno) VALUES (?, ?)";
        con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    });
};
module.exports=handleNotifications;