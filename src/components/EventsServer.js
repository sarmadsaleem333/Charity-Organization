import React, { useContext, useEffect, useState } from 'react'
import EventContext from '../context/eventsContext/EventContext';
import alertContext from '../context/alertContext/AlertContext';
import { useNavigate } from 'react-router-dom';
import Event from './Event';
export default function EventsServer() {
  const context = useContext(alertContext);
  const context1 = useContext(EventContext);
  const { showAlert } = context;
  const { uploadEvent, getEventsByServer, serverEvents, } = context1
  const [eventCredentials, setEventCredentials] = useState({ eventname: "", eventdate: "", volunteers_no: "", description: "" });
  const onChange = (e) => {
    setEventCredentials({ ...eventCredentials, [e.target.name]: e.target.value });
  }
  const onImageChange = (e) => {
    setEventCredentials({ ...eventCredentials, photolink: e.target.files[0] });
  };
  const formatDateString = (inputDate) => {
    const dateObject = new Date(inputDate);

    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based, so we add 1
    const year = dateObject.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }
  const upload = async (e) => {
    e.preventDefault();

    // Convert event date to a Date object
    const eventDate = new Date(eventCredentials.eventdate);

    // Get the current date
    const currentDate = new Date();

    // Compare event date with the current date
    if (eventDate <= currentDate) {
      // Event date is not greater than the current date
      showAlert('Event date must be greater than the current date', 'danger');
      return;
    }
    const formData = new FormData();
    formData.append("eventname", eventCredentials.eventname);
    formData.append("eventdate", eventCredentials.eventdate);
    formData.append("volunteers_no", eventCredentials.volunteers_no);
    formData.append("description", eventCredentials.description);
    formData.append("photolink", eventCredentials.photolink);
    console.log(formData)
    console.log(eventCredentials);
    const newDate = formatDateString(eventCredentials.eventdate);
    const message = await uploadEvent(eventCredentials.eventname, newDate, eventCredentials.description, eventCredentials.volunteers_no);
    setEventCredentials({ eventname: "", eventdate: "", volunteers_no: "", description: "", photolink: "" });
    showAlert("Your event uploaded", "success");
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getEventsByServer();
    } else {
      navigate('/login_server');
    }
  }, []);
  return (
    <div>
      {console.log(serverEvents)}
      <div className="modal fade" id="create-event-model" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Uploading Event</h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Name of Event" aria-label="Blog Title" name='eventname' onChange={onChange} value={eventCredentials.eventname} aria-describedby="basic-addon1" />

            </div>

            <div className="input-group mb-3">
              <input type="date" className="form-control" id='blog-text' placeholder='Date in dd-mm-yyyy' name='eventdate' onChange={onChange} value={eventCredentials.eventdate} aria-label="Blog Text" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <input type="number" className="form-control" id='blog-text' placeholder="Number Of Volunteers" name='volunteers_no' onChange={onChange} value={eventCredentials.volunteers_no} aria-label="Blog Text" aria-describedby="basic-addon1" />
            </div>
            <div>
              <textarea
                id="message"
                name="description"
                value={eventCredentials.description}
                placeholder='Description'
                onChange={onChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                defaultValue={""}
              />
            </div>

            <div className="input-group mb-3">
              <i className="fa-regular fa-images mx-2 my-2" ></i>
              <input type="file" accept='image/*' onChange={onImageChange} />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" data-bs-dismiss="modal" onClick={upload}>Upload</button>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-success btn-lg m-md-3 " data-bs-toggle="modal" data-bs-target="#create-event-model">Upload Event <i className="fa-solid fa-plus"></i></button>

      <h1 className='text-center font-bold text-4xl py-10'> Events</h1>
      <div className="flex flex-wrap -m-4">

        {serverEvents.length === 0 ? (
          <p>No events available</p>
        ) : (
          serverEvents.map((event) => <Event key={event.eventno} event={event} />)
        )}
      </div>
    </div>
  )
}
