import React, { useContext, useEffect } from 'react';
import HistoryItem from './HistoryItem';
import historyDonationContext from '../context/HistroyOfDonations/historyDonationContext';

export default function UserHistory() {
  const context = useContext(historyDonationContext);
  const { getAllDonationsByUser, HistoryOfUserDonations } = context;
  const headerStyle = {
    width: '20%', // Adjust the width as needed
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    padding: '8px',
    color: 'red',
    fontWeight: 'bold',
  };


  useEffect(() => {
    getAllDonationsByUser();
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold leading-7 pt-10 pb-2 text-center text-black-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Your Donation History is as Follows
        </h2>
        <div className='flex justify-between py-3'>
          <div style={headerStyle}>Case Name</div>
          <div style={headerStyle}>Receipt No</div>
          <div style={headerStyle}>Date of Donation</div>
          <div style={headerStyle}>Amount (PKR)</div>
          <div style={headerStyle}>Account Title</div>
        </div>
        <div>
          {HistoryOfUserDonations.length === 0 ? (
            <p>You have made no donation yet.</p>
          ) : (
            HistoryOfUserDonations.map((donation) => (
              <HistoryItem donation={donation} key={donation.receiptno} />
            ))
          )}

        </div>
      </div>

    </>
  );
}
