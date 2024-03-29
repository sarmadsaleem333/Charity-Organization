
import React, { useState } from 'react'
import serverCaseContext from './serverCaseContext'

const ServerCaseState = (props) => {
    const [ServerRegisteredCases, setServerRegisteredCases] = useState([]);
    const [UserApplications, setUserApplications] = useState([]);
    const [TransferredCases, setTransferredCases] = useState([]);
    const [NonTransferredCompletedCases, setNonTransferredCompletedCases] = useState([]);
    const host = "http://localhost:3333";

    // approve the case 
    const approveCase = async (caseId, name) => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/approve_case/${caseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ name }),
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    };

    //server regisstered cases
    const getServerRegisteredCases = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/get_all_registered_cases_by_server`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const json = await response.json();
            setServerRegisteredCases(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    // get case applications of user
    const getUserApplications = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/get_all_applications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const json = await response.json();
            setUserApplications(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    //all transfereed cases
    const getTransferredCasesByServer = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/get_all_transferred_cases_by_server`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const json = await response.json();
            console.log(json);
            setTransferredCases(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    //all completed but not transferred

    const getNonTransferredCompletedCases = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/get_all_non_transferred_cases_but_completed`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const json = await response.json();
            setNonTransferredCompletedCases(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    //case transfer
    const transferCaseMoney = async (caseId) => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/tranfer_case_money/${caseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const message = await response.json();
            return message;

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <serverCaseContext.Provider value={{ ServerRegisteredCases, TransferredCases, UserApplications, NonTransferredCompletedCases, approveCase, getServerRegisteredCases, getUserApplications, getTransferredCasesByServer, getNonTransferredCompletedCases, transferCaseMoney }} >
            {props.children}
        </serverCaseContext.Provider>
    )
}


export default ServerCaseState;
