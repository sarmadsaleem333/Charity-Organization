import React, { useContext, useState } from 'react';
import ItemContext from '../context/itemsContext/ItemContext'
import alertContext from '../context/alertContext/AlertContext'

export default function Item(props) {
    const { item } = props;
    const context1 = useContext(ItemContext);
    const context2 = useContext(alertContext);
    const { showAlert } = context2;
    const { donateItem, transferItem } = context1;

    const [itemDonateCredentials, setItemDonateCredentials] = useState({ quantity: 0, cardno:"" });
    const onChange = (e) => {
        setItemDonateCredentials({ ...itemDonateCredentials, [e.target.name]: e.target.value });
    }
    const handleDonation = async (id) => {
        if (itemDonateCredentials.cardno.length<16 || itemDonateCredentials.cardno.length>19) {
            return showAlert("Enter correct Card Number","success");
            setItemDonateCredentials({ quantity: 0, cardno: "" })
        }
        const response = await donateItem(itemDonateCredentials.quantity, id);
        setItemDonateCredentials({ quantity: 0, cardno: "" })

        showAlert(response, "success");

    }
    return (
        <>
            {/* modal for item donation */}
            <div className="modal fade custom-modal" id={`donate__${item.ino}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title">Donating  {item.iname}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor={`quantity_${item.ino}`} className="form-label">Quantity:</label>
                                    <input type="number" name='quantity' value={itemDonateCredentials.quantity} onChange={onChange} className="form-control" id={`quantity_${item.ino}`} placeholder="Enter quantity" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`cardNumber_${item.ino}`} className="form-label">Card Number:</label>
                                    <input type="text" className="form-control" name='cardno' value={itemDonateCredentials.cardno} onChange={onChange} placeholder="Enter card number(16-18 digits)" />
                                </div>
                            </form>
                            <div >
                            <label className='font-bold text-blue-700'>You are donating PKR {item.iprice * itemDonateCredentials.quantity}</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleDonation(item.ino)}>Donate</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="modal fade custom-modal" id={`donate1__${item.ino}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title"></h3>
                            <h5 className="modal-subtitle">cdescriptio</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
 */}

            <div className="lg:w-1/4 md:w-1/2 p-4 w-full py-3 px-4">
                <a className="block relative h-48 rounded overflow-hidden">
                    <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={`http://localhost:3333/images/${item.iphoto}`}
                    />
                </a>
                <div className="mt-4">
                    <div className='flex justify-around'>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                            {item.iname}
                        </h2>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                            InStock :{item.iquantity}
                        </h2>
                    </div>
                    <div className='flex justify-around'>
                        <h2 className="text-red-500 title-font text-lg font-medium">
                            PKR  {item.iprice}
                        </h2>
                    </div>
                    <button

                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        data-bs-toggle="modal"
                        data-bs-target={`#donate__${item.ino}`}>
                        Donate
                    </button>
                    {/* <button

                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        data-bs-toggle="modal"
                        data-bs-target={`#donate1__${item.ino}`}>
                        Donate
                    </button> */}


                </div>
            </div>
        </>
    );
}
