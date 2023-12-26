import React, { useState } from "react";
import notificationsContext from "./notificationsContext";
const NotificationsState = (props) => {
    const [userNotifications, setuserNotifications] = useState([]);
    const [serverNotifications, setserverNotifications] = useState([]);
    const host = "http://localhost:3333";

    // get history of all donations by user
    const getAllNotificationsUser = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/notification/get_notifications_by_user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                }
            });
            const donations = await response.json();
            setuserNotifications(donations);
        } catch (error) {
            console.error(error.message);
        }
    };
    // get history of all donations by server
    const getAllNotificationsServer = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/notification/get_notifications_by_server`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const donations = await response.json();
            setserverNotifications(donations);
        } catch (error) {
            console.error(error.message);
        }
    };


    return (

        <notificationsContext.Provider value={{ getAllNotificationsServer, getAllNotificationsUser, userNotifications, serverNotifications }} >
            {props.children}
        </notificationsContext.Provider>
    )
}

export default NotificationsState;
