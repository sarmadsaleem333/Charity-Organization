import React, { useContext } from 'react';
import ItemContext from '../context/itemsContext/ItemContext'
import alertContext from '../context/alertContext/AlertContext'

export default function NonTransferItem(props) {
    const { item, transfer } = props;

    const context1 = useContext(ItemContext);
    const context2 = useContext(alertContext);
    const { showAlert } = context2;
    const { transferItem } = context1;
    const divStyle = {
        width: '20%', 
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '8px',
    };

    const transferHandle = async (id) => {
        const response = await transferItem(id);
        showAlert(response, "success");
    }

    return (
        <>
            <div class="modal" tabindex="-1" id={`transfer__${item.ino}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Transferring the Item</h5>
                            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>You are transferring {item.iname} for {item.receiptno} </p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-primary" data-bs-dismiss="modal" onClick={() => transferHandle(item.receiptno)}>Transfer</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between py-3'>
                <div style={divStyle}>
                    <p className="text-gray-500">{item.iname}</p>
                </div>
                <div style={divStyle}>
                    <p className="text-gray-500">{item.uname}</p>
                </div>
                <div style={divStyle}>
                    <p className="text-gray-500">{item.quantity}</p>
                </div>
                <div style={divStyle}>
                    <p className="text-gray-500">{item.idate.slice(0, 10)}</p>
                </div>
                <div style={divStyle}>
                    {transfer?(<p className="text-gray-500">Transferred</p>):(<p className="text-gray-500">Pending</p>)}
                </div>

            </div>
            {
                !transfer ?
                    (<div className="flex justify-center">
                        <div className="btn-primary btn" data-bs-toggle="modal"
                            data-bs-target={`#transfer__${item.ino}`} >Transfer</div>
                    </div>) :
                    null
            }
        </>

    );
}
