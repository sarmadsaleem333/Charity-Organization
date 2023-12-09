import donationCaseContext from "./donationCaseContext";
import React from "react";

const donationCaseState = (props) => {
    const host = "http://localhost:3333";

    const donateCase = async (caseId, amount, accounttitle, accountno) => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_case/donate_case/${caseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
                },
                body: JSON.stringify({ amount, accounttitle, accountno }),
            });

            const message = await response.text();

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

export default donationCaseState;
