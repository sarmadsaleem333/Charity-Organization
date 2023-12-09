
import React, { useState } from 'react'
import serverCaseContext from './serverCaseContext'

const serverCaseState = (props) => {
    const [ServerRegisteredCases, setServerRegisteredCases] = useState([]);
    const [UserApplications, setUserApplications] = useState([]);
    const [TransferredCases, setTransferredCases] = useState([]);
    const [NonTransferredCompletedCases, setNonTransferredCompletedCases] = useState([]);
    const host = "http://localhost:3333";

    // approve the case 
    const approveCase = async (caseId) => {
        try {
            const response = await fetch(`${host}/charity_organization/case_server/approve_case/${caseId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const json = await response.json();
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
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


export default serverCaseState;
