import React, { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import alertContext from '../context/alertContext/AlertContext';
export default function TransferCompletedCasesCard(props) {
    const { application } = props;
    const context = useContext(serverCaseContext);
    const context2 = useContext(alertContext);
    const { transferCaseMoney } = context;
    const { showAlert } = context2;

    const handleTransfer = async (id) => {
        const response = await transferCaseMoney(id);
        showAlert(response, "success");
    }

    return (
        <>
            {/* Modal 2*/}
            <div className="modal fade" id={`transfer${application.cno}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`exampleModalLabel${application.cno}`}>
                                Transfer Details
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <span className="font-semibold">Account No:</span> {application.caccountno}
                            </p>
                            <p>
                                <span className="font-semibold">Account Title:</span> {application.caccounttitle}
                            </p>
                            <p>
                                <span className="font-semibold">Transferring:</span> PKR {application.amountmade}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button className="btn btn-primary" onClick={() => handleTransfer(application.cno)}>
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
                        <div className="font-bold text-xl mb-2 text-blue-900">By: {application.uname}</div>

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
                        <p className="py-2 font-semibold">Last Date: {application.clastdate.slice(0, 10)}</p>
                    </div>
                    <div>
                        <div className="btn-secondary btn py-3" data-bs-toggle="modal" data-bs-target={`#transfer${application.cno}`} > Transfer The Money  </div>
                    </div>

                </div>
            </div>

        </>

    );
}
