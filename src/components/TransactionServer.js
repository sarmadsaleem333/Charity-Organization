import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import alertContext from '../context/alertContext/AlertContext';
import TransferCompletedCasesCard from './TransferCompletedCasesCard';
import serverAuthContext from '../context/serverContext/serverAuthContext';

export default function TransactionServer() {
    const context = useContext(serverCaseContext);
    const context2 = useContext(alertContext);
    const context3 = useContext(serverAuthContext);
    const { fetchserverDetails, serverDetails, editDetails } = context3;
    const { showAlert } = context2;
    const { getTransferredCasesByServer, NonTransferredCompletedCases, getNonTransferredCompletedCases } = context;
    useEffect(() => {
        getTransferredCasesByServer();
        getNonTransferredCompletedCases();
        fetchserverDetails();
    }, []);
    const [account, setAccount] = useState({ accountno: "", accounttitle: "" });

    const onChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    const handleEdit = async () => {
        if (account.accountno.length < 8 || account.accountno.length > 12) {
            setAccount({ accountno: "", accounttitle: "" });

            return showAlert("Enter correct account no b/w 8 and 12 digits", "success");
        }
        const response = await editDetails(account.accounttitle, account.accountno);
        showAlert(response, "success");
        setAccount({ accountno: "", accounttitle: "" });
    }
    return (
        <>
            <div className="modal fade custom-modal" id="nothing" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="accountNumber" className="form-label" placeholder='B/w 8-12 digits'>Enter your Account No</label>
                                <input type="number" className="form-control" name="accountno" value={account.accountno} onChange={onChange} id="accountNumber" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="accountName" className="form-label">Change your account Title</label>
                                <input type="text" className="form-control" name="accounttitle" value={account.accounttitle} onChange={onChange} id="accountName" />
                            </div>

                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                onClick={handleEdit}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >   Edit

                            </button>
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <h1 className="text-3xl font-semibold mb-4">Hello, Give Hope Network</h1>
                <div className="flex my-3">
                    <div className="text-xl font-semibold mr-4">Total Amount You have:</div>
                    <div className="text-xl"> PKR {serverDetails.samount}</div>
                </div>
                <div className="flex my-3">
                    <div className="text-xl font-semibold mr-4">Donations Account No:</div>
                    <div className="text-xl">  {serverDetails.sacccountno}</div>
                </div>
                <div className="flex my-3">
                    <div className="text-xl font-semibold mr-4">Donations Account Title:</div>
                    <div className="text-xl">  {serverDetails.saccounttitle}</div>
                </div>
                <div className="div">
                    <div className="btn-primary btn" data-bs-toggle="modal" data-bs-target="#nothing"   >Edit Details</div>
                </div>
                <h1 className='text-center font-bold text-4xl py-2'>Transfer the amount for following cases</h1>
                <div className='flex flex-wrap justify-center gap-4'>
                    {NonTransferredCompletedCases.length === 0 ? (
                        <p>No completed cases yet</p>
                    ) : (
                        NonTransferredCompletedCases.map((caseItem) => (
                            <TransferCompletedCasesCard application={caseItem} key={caseItem.cno} />
                        ))
                    )}
                </div>
            </div>
        </>

    );
}
