import donationCaseContext from "./donationCaseContext";
import React from "react";

const DonationCaseState = (props) => {
    const host = "http://localhost:3333";

    const donateCase = async (caseId, amount, accounttitle, accountno) => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_case/donate_case/${caseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ amount, accounttitle, accountno }),
            });

            const json = await response.json();
            return json;


        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <donationCaseContext.Provider value={{ donateCase }} >
            {props.children}
        </donationCaseContext.Provider>
    )
}

export default DonationCaseState;
