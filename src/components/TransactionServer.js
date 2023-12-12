import React from 'react';

export default function TransactionServer() {
    // Assume you have a user object with a 'name' property
    const user = { name: 'John Doe' };

    // Assume you have a totalAmount value
    const totalAmount = 5000;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold mb-4">Hello, Give Hope Network</h1>

            <div className="flex">
                <div className="text-xl font-semibold mr-4">Total Amount:</div>
                <div className="text-xl">{totalAmount} PKR</div>
            </div>
            <h1 className='text-center font-bold text-4xl py-2'>Completed Cases</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {/* <CaseCard/> */}
            </div>  

        </div>
    );
}
