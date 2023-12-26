import React, { useContext, useEffect } from 'react';
import HistoryItem from './HistoryItem';
import historyDonationContext from '../context/HistroyOfDonations/historyDonationContext';
import ItemContext from '../context/itemsContext/ItemContext';
import ItemsHistory from './ItemsHistory';
import { useNavigate } from 'react-router-dom';

export default function UserHistory() {

  const context = useContext(historyDonationContext);
  const context1 = useContext(ItemContext);
  const { getAllDonationsByUser, HistoryOfUserDonations } = context;
  const { getHistoryByUser, userHistory } = context1;
  const headerStyle = {
    width: '20%', 
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc',
    padding: '8px',
    color: 'red',
    fontWeight: 'bold',
  };

  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      getAllDonationsByUser();
      getHistoryByUser(); }
    else{
      navigate("/login_user")
    }
  }, [])

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
        <h2 className="text-2xl font-bold leading-7 pt-10 pb-2 text-center text-black-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Your Item Donation History is as Follows
        </h2>
        <div className='flex justify-between py-3'>
          <div style={headerStyle}>Item Name</div>
          <div style={headerStyle}>Receipt No</div>
          <div style={headerStyle}>Date of Donation</div>
          <div style={headerStyle}>Quantity</div>
          <div style={headerStyle}>Amount</div>
        </div>
          
        <div className="flex flex-col">
          {userHistory.length > 0 ? (
            userHistory.map((item) => (
              <ItemsHistory key={item.ino} item={item} transfer={true} />

            ))
          ) : (
            <p className="text-gray-500 justify-center d-flex font-bold pt-5">No non transfer donations</p>
          )}
        </div>
      </div>

    </>
  );
}
