import React from 'react';

export default function Item() {
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
                                <label for="exampleInputPassword1" class="form-label">Enter Quantity</label>
                                <input type=" name" class="form-control" id="exampleInputPassword2" />
                            </div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Donate</button>
                        </div>


                    </div>
                </div>
            </div>


            <div className="lg:w-1/4 md:w-1/2 p-4 w-full py-3 px-4">
                <a className="block relative h-48 rounded overflow-hidden">
                    <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src="https://dummyimage.com/420x260"
                    />
                </a>
                <div className="mt-4">
                    <div className='flex justify-around'>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                            Blanket
                        </h2>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                            InStock :7
                        </h2>
                    </div>
                    <div className='flex  justify-around'>
                        <h2 className="text-red-500 title-font text-lg font-medium">
                            PKR 70
                        </h2>
                    </div>
                    <div className="flex justify-around pt-3">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-bs-toggle="modal" data-bs-target="#modal">Donate</button></div>
                </div>
            </div>
        </>

    );
}
