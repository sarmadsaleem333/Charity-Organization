import React from 'react';

export default function CaseCard() {
    return (
        <div className='py-8 px-8'>
            <div className="max-w-md rounded overflow-hidden shadow-lg border-2 border-gray-300 p-4">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Student Fee issue</div>
                    
                    <p className="text-gray-700 text-base">
                        Your generous contributions make a difference in the lives of those facing hardships. Let's come together and create positive change in the world.
                    </p>
                </div>
                <div className='flex justify-evenly'>
                <dd className="order-first text-3xl font-semibold tracking-tight text-red-500 sm:text-4xl">
                PKR 100 
                </dd>
                <p className='py-2 font-semibold'>Last Date: 5-December-2023</p>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between">
                    <a href="#" className="block mt-2  font-semibold text-blue-500 text-1xl hover:underline">Read more</a>
                    <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Donate</button>
                </div>
            </div>

        </div>
    );
}
                    
