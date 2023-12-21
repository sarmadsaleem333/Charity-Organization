
const { con } = require("../db");

const handleNotifications = (message, userId, string) => {
    const insertNotificationSql = "INSERT INTO notifications (nmessage) VALUES (?)";

    con.query(insertNotificationSql, [message], (error, notificationResults) => {
        if (error) {
            console.error(error);
            return;
        }

        if (notificationResults && notificationResults.insertId !== undefined) {
            const notificationId = notificationResults.insertId;

            const insertUserNotificationSql = (string === "user") ?
                "INSERT INTO usernotification (nno, uno) VALUES (?, ?)" :
                "INSERT INTO servernotification (nno, sno) VALUES (?, ?)";

            con.query(insertUserNotificationSql, [notificationId, userId], (error) => {
                if (error) {
                    console.error(error);
                    return;}
            });
        } else {
            console.error("Error: InsertId not found in notificationResults");
            return;
        }
    });
};

module.exports = handleNotifications;
