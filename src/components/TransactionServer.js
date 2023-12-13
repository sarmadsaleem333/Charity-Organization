import React, { useEffect } from 'react';
import { useContext } from 'react';
import serverCaseContext from '../context/ServerCase/serverCaseContext';
import alertContext from '../context/alertContext/AlertContext';
import TransferCompletedCasesCard from './TransferCompletedCasesCard';
export default function TransactionServer() {
    const context = useContext(serverCaseContext);
    const context2 = useContext(alertContext);
    const { getTransferredCasesByServer, TransferredCases, NonTransferredCompletedCases, getNonTransferredCompletedCases } = context;
    const totalAmount = 5000;
    useEffect(() => {
        getTransferredCasesByServer();
        getNonTransferredCompletedCases();
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold mb-4">Hello, Give Hope Network</h1>
            <div className="flex">
                <div className="text-xl font-semibold mr-4">Total Amount You have:</div>
                <div className="text-xl">{totalAmount} PKR</div>
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
    );
}
