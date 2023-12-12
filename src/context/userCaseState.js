import React, { useState } from 'react'
import userCaseContext from './userCaseContext'

const UserCaseState = (props) => {
    const [RegisteredCases, setRegisteredCases] = useState([]);
    const [AllUnApprovedCases, setAllUnApprovedCases] = useState([]);
    const [AllTransferedCases, setAllTransferedCases] = useState([]);
    const [AllInProgressCases, setAllInProgressCases] = useState([]);
    const host = "http://localhost:3333";

    //get all registeredCases
    const getAllRegisteredCases = async () => {
        const response = await fetch(`${host}/charity_organization/case_user/get_all_registered_cases_by_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
            }
        });
        const json = await response.json();
        setRegisteredCases(json);
    };
    //get applied uunapproved
    const getAllUnApprovedCases = async () => {
        const response = await fetch(`${host}/charity_organization/case_user/get_my_applied_unapproved_cases`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
            }
        });
        const json = await response.json();
        setAllUnApprovedCases(json);
    };
    //get my inprogress courses
    const getAllInProgressCases = async () => {
        const response = await fetch(`${host}/charity_organization/case_user/get_my_inprogress_cases`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
            }
        });
        const json = await response.json();
        setAllInProgressCases(json);
    };
    //get my AllTransferedCases
    const getAllTransferedCases = async () => {
        const response = await fetch(`${host}/charity_organization/case_user/get_my_transferredcases`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
            }
        });
        const json = await response.json();
        setAllTransferedCases(json);
    };
    //apply case
    const applyCase = async (cdescription, clastdate, camountreq, caccountno, caccounttitle) => {
        try {
            const response = await fetch(`${host}/charity_organization/case_user/apply_case`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
                },
                body: JSON.stringify({ cdescription: cdescription, clastdate: clastdate, camountreq: camountreq, caccountno: caccountno, caccounttitle: caccounttitle }),
            });

            const json = await response.json();
            return json;

        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <userCaseContext.Provider value={{ RegisteredCases, AllTransferedCases, AllUnApprovedCases, getAllUnApprovedCases, AllInProgressCases, getAllInProgressCases, getAllRegisteredCases, getAllTransferedCases, applyCase }} >
            {props.children}
        </userCaseContext.Provider>
    )
}

export default UserCaseState;
