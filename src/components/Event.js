import React, { useContext, useState } from 'react';
import EventContext from '../context/eventsContext/EventContext';
import alertContext from '../context/alertContext/AlertContext';
export default function Event(props) {
    const { event, user } = props;

    const context = useContext(alertContext);
    const context1 = useContext(EventContext);
    const { showAlert } = context;
    const { volunteerEvent, getVolunteerForEvents } = context1
    const handleVolunteer = async (id) => {

        const response = await volunteerEvent(id);
        console.log(response)
        showAlert(response, "success");
    }
    const [volunteer, setVolunteer] = useState([]);
    const countVolunteers = async (id) => {
        const response = await getVolunteerForEvents(id);
        setVolunteer(response);
    }

    return (
        <>
            <div class="modal fade" id={`exampleModal${event.eventno}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Volunteering for {event.eventname}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you sure to volunteer?
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleVolunteer(event.eventno)}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id={`count${event.eventno}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Volunteering for {event.eventname}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            {volunteer && volunteer.length > 0 ? (
                                <div>
                                    <h3>Volunteers:</h3>
                                    <ul>
                                        {volunteer.map((volunteer, index) => (
                                            <li key={index}>{volunteer.uname}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <p>No volunteers for this event.</p>
                                </div>
                            )}
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full py-3 border border-gray-300 rounded pr-20 mx-auto">                <div className="border rounded overflow-hidden">
                <img
                    alt="Event"
                    className="object-cover object-center w-full h-48"
                    src={event.photolink}
                />
            </div>
                <div className="mt-4 px-4">
                    <h2 className="text-gray-900 text-lg font-medium mb-2">
                        {event.eventname}
                    </h2>
                    <h2 className="text-blue-500 text-lg font-medium">
                        Date:{event.eventdate.slice(0, 10)}
                    </h2>
                    <p className="text-gray-700">{event.description}</p>
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-red-500 text-lg font-medium">
                            Required {event.volunteers_no} volunteers
                        </h2>
                        <h2 className="text-red-500 text-lg font-medium">
                            Made: {event.current_volunteers} volunteers
                        </h2>

                        {user ? (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                data-bs-toggle="modal"
                                data-bs-target={`#exampleModal${event.eventno}`}
                            >
                                Register
                            </button>
                        ) : (
                            <button
                                onClick={() => countVolunteers(event.eventno)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                data-bs-toggle="modal"
                                data-bs-target={`#count${event.eventno}`}
                            >Get Volunteers
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </>
    );

}

