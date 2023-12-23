import React, { useState } from 'react'
import axios from 'axios';
import EventContext from './EventContext';
const EventState = (props) => {
    const host = "http://localhost:3333";
    const [userEvents, setUserEvents] = useState([]);
    const [userMineEvents, setUserMineEvents] = useState([]);
    const [serverEvents, setServerEvents] = useState([]);
    // uplaod event by server 
    const uploadEvent = async (formData) => {
        try {
            const response = await axios.post(`${host}/charity_organization/events/upload_event`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2ZXIiOnsiaWQiOjF9LCJpYXQiOjE3MDIxMDQ5MDh9.f_W1o8cy0MWPuCbmV0M_waLfjTLaKUzCUJQhJFBy-Mc",
                },
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getEventsByUser = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/events/get_events_by_user`, {
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
            setUserEvents(json);
        } catch (error) {
            console.error(error.message);
        }
    };
    const getEventsByServer = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/events/get_events_by_server`, {
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
            setServerEvents(json);
        } catch (error) {
            console.error(error.message);
        }
    };

    const getEventsByUserMine = async () => {
        try {
            const response = await fetch(`${host}/charity_organization/events/get_all_my_events`, {
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
            setUserMineEvents(json);
        } catch (error) {
            console.error(error.message);
        }
    };
    const volunteerEvent = async (id) => {
        try {
            const response = await fetch(`${host}/charity_organization/events/volunteer_for_event/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTcwMjEwMjg4N30.pTKfAAPUoREb8F_jJ0aUDuyGcYKLzu0d9dpRqZajT5s",
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

    const getVolunteerForEvents = async (id) => {
        try {
            const response = await fetch(`${host}/charity_organization/events/get_volunteers_for_event/${id}`, {
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
            return json;
        } catch (error) {
            console.error(error.message);
        }
    };



    return (
        <EventContext.Provider value={{ getVolunteerForEvents, volunteerEvent, uploadEvent, getEventsByUser, userEvents, getEventsByServer, serverEvents, getEventsByUserMine, userMineEvents }} >
            {props.children}
        </EventContext.Provider>
    )
}


export default EventState;
