import React from 'react';

export default function CaseCardServer() {
  return (
    <div className="p-4">
      <div className="max-w-md rounded overflow-hidden shadow-lg border-2 border-gray-300">
        <div className="px-6 py-4">
          <div className="font-semibold text-lg mb-2 text-red-900">By: userName</div>
          <p className="py-2 text-base font-semibold">Apply Date: lorem</p>
          <div className="font-semibold text-lg mb-2">Amount Requested: PKR 1200</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, totam.
          </p>
          <div className="btn-primary btn mt-4">Read More</div>
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <div className="text-base font-semibold text-red-500">Last Date: lorem2</div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              data-bs-toggle="modal"
              data-bs-target="#modal"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
