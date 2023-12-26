import React, { useState } from 'react'
import axios from 'axios';
import ItemContext from './ItemContext';
const ItemState = (props) => {
    const [ServerItems, setServerItems] = useState([]);
    const [UserItems, setUserItems] = useState([]);
    const [NonTransferItems, setNonTransferItems] = useState([]);
    const [TransferItems, setTransferItems] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [serverHistory, setServerHistory] = useState([]);
    const host = "http://localhost:3333";

    // uplaod item by server 
    const uploadItem = async (formData) => {
        try {
            const response = await axios.post(`${host}/charity_organization/donation_item/upload_item`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            console.log(formData)
            console.log(response.data);
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
                    "auth-token": localStorage.getItem("token"),
                },
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const json = await response.json();
            console.log(json)
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
                    "auth-token": localStorage.getItem("token"),
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
                    "auth-token": localStorage.getItem("token"),
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
                    "auth-token": localStorage.getItem("token"),
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
    const donateItem = async (quantity, id) => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/donate_item/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({ quantity: quantity }),

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
                    "auth-token": localStorage.getItem("token"),
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
                    "auth-token": localStorage.getItem("token"),
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
    const getHistoryByServer = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/all_donations_by_server`, {
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
            setServerHistory(json);
        } catch (error) {
            console.error(error.message);
        }
    };
    const getHistoryByUser = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/donation_item/all_donations_by_user`, {
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
            console.log(userHistory)
            setUserHistory(json);
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <ItemContext.Provider value={{ userHistory, serverHistory, getHistoryByServer, getHistoryByUser, editQuantity, TransferItems, NonTransferItems, ServerItems, UserItems, uploadItem, getItemsByServer, getItemsByUser, getNonTransferItems, getTransferItems, donateItem, transferItem }} >
            {props.children}
        </ItemContext.Provider>
    )
}


export default ItemState;
