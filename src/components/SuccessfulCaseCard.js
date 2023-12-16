import React from 'react';
import { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import { Link } from 'react-router-dom';

export default function SuccessfulCaseCard(props) {
    const { application } = props;
    const context = useContext(serverCaseContext);


    const getDetails = (id) => {
        console.log()
    }


    return (
        <>
            {/* Modal */}
            <div className="modal fade" id={`add-comment__${application.cno}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{application.cdescription}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>


            <div className="py-8 px-8">
                <div className="max-w-md rounded overflow-hidden shadow-lg border-2 border-gray-300 p-4">
                    <div className="px-6 py-4">

                        <div className="font-bold text-xl mb-2 text-red-900">{application.name}</div>

                        <div className="font-bold text-xl mb-2">Amount Required: PKR {application.camountreq}</div>
                        <p className="text-gray-700 text-base">
                            {application.cdescription.slice(0, 100)}...
                        </p>

                        <div className="btn-primary btn mt-4" data-bs-toggle="modal" data-bs-target={`#add-comment__${application.cno}`}>Read More</div>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">

                        <div className="text-lg font-semibold text-red-500">
                            Amount Made:{application.amountmade}
                        </div>
                        <Link className="btn-primary btn mt-4 pb-2" to={`/case_donation_history/${application.cno}`}>Get Details</Link>
                    </div>

                </div>
            </div>

        </>

    );
}
