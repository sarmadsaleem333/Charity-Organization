import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import historyDonationContext from '../context/HistroyOfDonations/historyDonationContext';
export default function CaseHistoryDonations(props) {

    const context = useContext(historyDonationContext);
    const { getAllDonationsByServer, ServerHistoryOfUserDonations } = context;

    const { id } = useParams();
    const divStyle = {
        width: '20%', // Adjust the width as needed
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '8px',
    };
    let name;
    useEffect(() => {
        getAllDonationsByServer(id);
    }, [])


    return (
        <div>
            <h1 className='text-center font-bold text-4xl pt-6'>Case Name: {ServerHistoryOfUserDonations[0].name} </h1>

            <div className='flex justify-between py-3'>
                <div style={{ ...divStyle, fontWeight: 'bold' }}>Receipt</div>
                <div style={{ ...divStyle, fontWeight: 'bold' }}>Donor Name</div>
                <div style={{ ...divStyle, fontWeight: 'bold' }}>Date of Donation</div>
                <div style={{ ...divStyle, fontWeight: 'bold' }}>Amount (PKR)</div>
                <div style={{ ...divStyle, fontWeight: 'bold' }}>Account Title</div>
            </div>

            {ServerHistoryOfUserDonations.length > 0 ? (
                ServerHistoryOfUserDonations.map((donation, index) => (
                    <div className='flex justify-between py-3' key={index}>
                        <div style={divStyle}>{donation.receiptno}</div>
                        <div style={divStyle}>{donation.uname}</div>
                        <div style={divStyle}>{donation.date.slice(0, 10)}</div>
                        <div style={divStyle}>{donation.amount}</div>
                        <div style={divStyle}>{donation.accounttitle}</div>
                    </div>
                ))
            ) : (
                <p>No donations for this case.</p>
            )}
        </div>
    );
}      
