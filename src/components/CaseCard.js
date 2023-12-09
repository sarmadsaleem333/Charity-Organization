import React from 'react';

export default function CaseCard() {
    return (
        <>
            {/* modal */}
            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Donating for case </h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Enter your Account No</label>
                                <input type="name" class="form-control" id="exampleInputEmail1 " />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter your account name</label>
                                <input type=" name" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Enter amount(Atleast Rs.100)</label>
                                <input type=" name" class="form-control" id="exampleInputPassword2" />
                            </div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Donate</button>
                        </div>


                    </div>
                </div>
            </div>

            <div className='py-8 px-8'>
                <div className="max-w-md rounded overflow-hidden shadow-lg border-2 border-gray-300 p-4">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Student Fee issue</div>
                        <div className="font-bold text-xl mb-2">Amount:PKR 1000</div>
                        <p className="text-gray-700 text-base">
                            Your generous contributions make a difference in the lives of those facing hardships. Let's come together and create positive change in the world.
                        </p>
                    </div>
                    <h4 className='font-bold pl-6'>Remaning amount: </h4>
                    <div className='flex justify-evenly'>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-red-500 sm:text-4xl">
                            PKR 600
                        </dd>
                        

                        <p className='py-2 font-semibold'>Last Date: 5-December-2023</p>

                    </div>
                    <div className="px-6 pt-4 pb-2 flex justify-between">


                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-bs-toggle="modal"
                            data-bs-target="#modal">Donate</button>
                    </div>
                </div>

            </div>
        </>
    );
}

