import React from 'react';

export default function CaseCard(props) {
    const { caseItem } = props;
    let amountLeft = caseItem.camountreq - caseItem.amountmade;

    return (
        <>
            {/* Modal */}
            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Donating for case </h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="accountNumber" className="form-label">Enter your Account No</label>
                                <input type="text" className="form-control" id="accountNumber" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="accountName" className="form-label">Enter your account name</label>
                                <input type="text" className="form-control" id="accountName" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="donationAmount" className="form-label">Enter amount (At least Rs.100)</label>
                                <input type="text" className="form-control" id="donationAmount" />
                            </div>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 px-8">
                <div className="max-w-md rounded overflow-hidden shadow-lg border-2 border-gray-300 p-4">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-red-900">{caseItem.name}</div>
                        <div className="font-bold text-xl mb-2">Amount: PKR {caseItem.camountreq}</div>
                        <p className="text-gray-700 text-base">
                            {caseItem.cdescription.slice(0, 100)}
                        </p>
                        <div className="btn-primary btn mt-4">Read More</div>
                    </div>
                    <div className="flex justify-between items-center border-t pt-4">
                        <div className="text-lg font-semibold text-red-500">
                            Remaining amount: {amountLeft}
                        </div>
                        <p className="py-2 font-semibold">Last Date: {caseItem.clastdate.slice(0, 10)}</p>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            data-bs-toggle="modal"
                            data-bs-target="#modal"
                        >
                            Donate
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
