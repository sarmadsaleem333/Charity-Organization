import React from 'react';

export default function HistoryItem(props) {
    const { donation } = props;

    const divStyle = {
        width: '20%', // Adjust the width as needed
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '8px',
    };

    return (
        <div className='flex justify-between py-3'>
            <div style={divStyle}>{donation.name}</div>
            <div style={divStyle}>{donation.receiptno}</div>
            <div style={divStyle}>{(donation.date).slice(0, 10)}</div>
            <div style={divStyle}>{donation.amount}</div>
            <div style={divStyle}>{donation.accounttitle}</div>
        </div>
    );
}
