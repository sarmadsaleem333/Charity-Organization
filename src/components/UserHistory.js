import React from 'react';
import HistoryItem from './HistoryItem';

export default function UserHistory() {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 pt-10 text-center text-black-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Your Donation History is as Follows
      </h2>
      <div className='flex justify-evenly py-3'>
        <div className='border-b border-r border-gray-900 text-red-900 font-bold sm:truncate sm:text-3xl sm:tracking-tight'>Case Name</div>
        <div className='border-b border-r border-gray-900 text-red-900 font-bold sm:truncate sm:text-3xl sm:tracking-tight'>Date of Donation</div>
        <div className='border-b border-r border-gray-900 text-red-900 font-bold sm:truncate sm:text-3xl sm:tracking-tight'>Amount Donated </div>
        <div className='border-b border-r border-gray-900 text-red-900 font-bold sm:truncate sm:text-3xl sm:tracking-tight'>Account No</div>
        <div className='border-b border-gray-900 text-red-900 font-bold sm :truncate sm:text-3xl sm:tracking-tight'>Account Title</div>
      </div>
      <div>
        <HistoryItem/>
        <HistoryItem/>
        <HistoryItem/>
      </div>
    </div>
  );
}
