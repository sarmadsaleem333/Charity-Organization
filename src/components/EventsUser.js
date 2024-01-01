import React, { useContext, useEffect } from 'react'
import EventContext from '../context/eventsContext/EventContext';
import alertContext from '../context/alertContext/AlertContext';
import { useNavigate } from 'react-router-dom';
import Event from './Event';
export default function EventsUser() {
  const navigate = useNavigate();
  const context = useContext(alertContext);
  const context1 = useContext(EventContext);
  const { showAlert } = context;
  const { getEventsByUser, userEvents, getEventsByUserMine, userMineEvents } = context1
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getEventsByUser();
      getEventsByUserMine();

    }
    else {
      navigate("/login_user")
    }
  }, [])
  return (


    <div>

      <h1 className='text-center font-bold text-4xl'> Events</h1>

      <div className="flex flex-wrap -m-4 py-10">

        {userEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          userEvents.map((event) => <Event key={event.eventno} user={true} event={event} />)
        )}
      </div>

      <h1 className='text-center font-bold text-4xl'>My upcoming Events</h1>

      <div className="flex flex-wrap -m-4 py-10">

        {userMineEvents.length === 0 ? (
          <p>You have no upcoming event</p>
        ) : (
          userMineEvents.map((event) => <Event key={event.eventno} user={true} event={event} />)
        )}
      </div>
    </div>
  )
}

