import React, { useState } from 'react'
import userAuthContext from './userAuthContext'

const UserAuthState = (props) => {

    const host = "http://localhost:3333";
    const [userDetails, setUserDetails] = useState({});

    const fetchuserDetails = async () => {
        const response = await fetch(`${host}/charity_organization/user_auth/fetch_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const json = await response.json();
        setUserDetails(json);
    }


    const signUpUser= async (name, email, password, phone, status) => {
        try {

            const response = await fetch(`${host}/charity_organization/user_auth/create_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, phone: phone, email: email, password: password, status: status })
            });

            const json = await response.json();
            console.log(json)
            return json;
        } catch (error) {
            console.log(error);

        }
    }
    const loginUser = async (email, password) => {
        const response = await fetch(`${host}/charity_organization/user_auth/login_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const json = await response.json();
        return json;

    }
    
    const changePassword = async (oldPassword,newPassword) => {
        const response = await fetch(`${host}/charity_organization/user_auth/change_password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ oldPassword:oldPassword, newPassword:newPassword})
        });
        const json = await response.json();
        return json;

    }
    


    return (
        <userAuthContext.Provider value={{ fetchuserDetails, userDetails, signUpUser, loginUser }}>
            {props.children}
        </userAuthContext.Provider>
    )
}

export default UserAuthState;