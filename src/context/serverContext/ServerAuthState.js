import React, { useState } from 'react'
import serverAuthContext from './serverAuthContext';



const ServerAuthState = (props) => {
  
    const host = "http://localhost:3333";
    const [serverDetails, setServerDetails] = useState({});

    const fetchserverDetails = async () => {
        const response = await fetch(`${host}/charity_organization/server_auth/fetch_server`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
            }
        });
        const json = await response.json();
        setServerDetails(json);
    }
   
    const editBalance = async (account_title,account_no) => {
        const response = await fetch(`${host}/charity_organization/server_auth/edit_account_details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
            },
            body: JSON.stringify({  account_title:account_title,account_no:account_no })
        });
        const json = await response.json();
        return json;
    }
    const editDetails = async (amount) => {
        const response = await fetch(`${host}/charity_organization/server_auth/edit_balance`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
            },
            body: JSON.stringify({  amount:amount })
        });
        const json = await response.json();
        return json;
    }
   
  
   
    const loginUser = async ( email, password) => {
        const response = await fetch(`${host}/charity_organization/server_auth/login_server`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({  email: email, password: password })
        });
        const json = await response.json();
        return json;

    }


    return (
        <serverAuthContext.Provider value={{fetchserverDetails, serverDetails,loginUser }}>
            {props.children}
        </serverAuthContext.Provider>
    )
}

export default ServerAuthState;