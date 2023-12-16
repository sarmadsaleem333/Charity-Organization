import React, { useState } from "react";
import historyDonationContext from "./historyDonationContext";

const HistoryDonationState = (props) => {
    const host = "http://localhost:3333";

    const [HistoryOfUserDonations, setHistoryOfUserDonations] = useState([]);
    const [ServerHistoryOfUserDonations, setServerHistoryOfUserDonations] = useState([]);

    // get history of all donations by user
    const getAllDonationsByUser = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/get_history_of_donations/get_all_donations_by_user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
                },
            });
            const donations = await response.json();
            setHistoryOfUserDonations(donations);
        } catch (error) {
            console.error(error.message);
        }
    };

    //get all donation details be server
    const getAllDonationsByServer = async (id) => {
        try {
            const response = await fetch(`${host}/charity_organization/get_history_of_donations/get_specific_case_donations_by_server/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },
            });
            const donations = await response.json();
            setServerHistoryOfUserDonations(donations);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <historyDonationContext.Provider value={{  getAllDonationsByUser, HistoryOfUserDonations,getAllDonationsByServer, ServerHistoryOfUserDonations }} >
            {props.children}
        </historyDonationContext.Provider>
    )
}

export default HistoryDonationState;
