import React from 'react';

export default function ItemsHistory(props) {
    const { item } = props;

    const divStyle = {
        width: '20%', // Adjust the width as needed
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '8px',
    };

    return (
        <div className='flex justify-between py-3'>
            <div style={divStyle}>{item.iname}</div>
            <div style={divStyle}>{item.receiptno}</div>
            <div style={divStyle}>{(item.idate).slice(0, 10)}</div>
            <div style={divStyle}>{item.quantity}</div>
            <div style={divStyle}>{item.amount}</div>
        </div>
    );
}
