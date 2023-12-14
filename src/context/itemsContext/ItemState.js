
import React, { useState } from 'react'
import axios from 'axios';
const ItemState = (props) => {
    const [ServerItems, setServerItems] = useState([]);
    const [UserItems, setUserItems] = useState([]);
    const [NonTransferItems, setNonTransferItems] = useState([]);
    const [TransferItems, setTransferItems] = useState([]);
    const host = "http://localhost:3333";

    // uplaod item by server 
    const uploadItem = async (formData) => {
        try {
            const response = await axios.post(`${host}/charity_organization/donation_item/upload_item`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    };
    //get items by server 
    const getItemsByServer = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/get_items_by_server`, {
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
            setServerItems(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    //getItems by user
    const getItemsByUser = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/get_items_by_user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
                },
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const json = await response.json();
            setUserItems(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    //getnon transfer items by server
    const getNonTransferItems = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/all_non_transfer_items`, {
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
            setNonTransferItems(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    //get transfer items by server
    const getTransferItems = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/all_transfer_items`, {
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
            setTransferItems(json);
        } catch (error) {
            console.error(error.message);
        }
    };


    // donate items 
    const donateItem = async (quantity, accounttitle, accountno, id) => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/donate_item/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
                },
                body: JSON.stringify({ quantity: quantity, accounttitle: accounttitle, accountno: accountno }),

            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    };
    // transfer item by server
    const transferItem = async (id) => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/transfer_item/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },

            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    };

    //edit quantities
    const editQuantity = async (id, iquantity) => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/edit_quantity/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },
                body: JSON.stringify({ iquantity: iquantity }),


            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <ItemContext.Provider value={{ editQuantity, TransferItems, NonTransferItems, ServerItems, UserItems, uploadItem, getItemsByServer, getItemsByUser, getNonTransferItems, getTransferItems, donateItem, transferItem }} >
            {props.children}
        </ItemContext.Provider>
    )
}


export default ItemState;
