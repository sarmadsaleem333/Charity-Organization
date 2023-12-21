
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

            const values = (string === "user") ? [notificationId, userId] : [notificationId, 1];

            con.query(insertUserNotificationSql, values, (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }

                return
            });
        } else {
            console.error("Error: InsertId not found in notificationResults");
            return;
        }
    });
};

module.exports = handleNotifications;
