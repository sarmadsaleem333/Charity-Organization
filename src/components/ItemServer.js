import React, { useContext, useEffect, useState } from 'react'
import Item from './Item';
import ItemContext from '../context/itemsContext/ItemContext'
import alertContext from '../context/alertContext/AlertContext'
import NonTransferItem from './NonTransferItem';

export default function ItemServer() {
  const divStyle = {
    width: '20%', // Adjust the width as needed
    textAlign: 'center',
    border: '1px solid #ccc',
    color: 'red',
    padding: '8px',
  };

  const context1 = useContext(ItemContext);
  const context2 = useContext(alertContext);
  const { showAlert } = context2;
  const { getItemsByUser, uploadItem, UserItems, NonTransferItems, getNonTransferItems,getHistoryByServer,serverHistory} = context1;

  const [itemCredentials, setItemCredentials] = useState({ iname: "", iquantity: "", iphoto: "", iprice: "" });
  const onChange = (e) => {
    setItemCredentials({ ...itemCredentials, [e.target.name]: e.target.value });
  }
  const onImageChange = (e) => {
    setItemCredentials({ ...itemCredentials, iphoto: e.target.files[0] });
  };
  const upload = async (e) => {
    e.preventDefault();
    console.log(itemCredentials)
    const formData = new FormData();
    formData.append("iquantity", itemCredentials.iquantity);
    formData.append("iname", itemCredentials.iname);
    formData.append("iprice", itemCredentials.iprice);
    formData.append("iphoto", itemCredentials.iphoto);
    if (itemCredentials.iquantity < 0) {
      setItemCredentials({ iname: "", iquantity: "", iphoto: null, iprice: "" });
      return showAlert("Add valid quantity", "success");
    }
    if (itemCredentials.iprice < 0) {
      setItemCredentials({ iname: "", iquantity: "", iphoto: "", iprice: "" });
      return showAlert("Add valid price", "success");
    }
    const message = await uploadItem(formData);

    setItemCredentials({ iname: "", iquantity: "", iphoto: "", iprice: "" });
    showAlert(message.message, "success");
  }

  useEffect(() => {
    getItemsByUser();
    getNonTransferItems();
    getHistoryByServer();
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 pt-10 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Items for Donation
      </h2>

      <div>
        <div className="modal fade" id="create-post-model" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Uploading Item</h5>
                <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Name of Item" aria-label="Blog Title" name='iname' onChange={onChange} value={itemCredentials.iname} onch aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <input type="number" className="form-control" id='blog-text' placeholder="Quantity" name='iquantity' onChange={onChange} value={itemCredentials.iquantity} onch aria-label="Blog Text" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <input type="number" className="form-control" id='blog-text' placeholder="Price" name='iprice' onChange={onChange} value={itemCredentials.iprice} onch aria-label="Blog Text" aria-describedby="basic-addon1" />
              </div>

              <div className="input-group mb-3">
                <i className="fa-regular fa-images mx-2 my-2" ></i>
                <input type="file" accept='image/*' onChange={onImageChange} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary" data-bs-dismiss="modal" onClick={upload}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-success btn-lg m-md-3 " data-bs-toggle="modal" data-bs-target="#create-post-model">Add Item <i className="fa-solid fa-plus"></i></button>
      </div>
      
      <div className="flex flex-wrap -m-4">
        {UserItems.length === 0 ? (
          <p>No items available</p>
        ) : (
          UserItems.map((item) => <Item key={item.ino} user={false} item={item} />)
        )}
      </div>
      <h2 className="text-2xl font-bold leading-7 pt-10 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Pending donations
      </h2>

      <div className='flex justify-between py-3'>
        <div style={divStyle}>Item Name</div>
        <div style={divStyle}>Donor Name</div>
        <div style={divStyle}>Quantity</div>
        <div style={divStyle}>Date of Donation</div>
        <div style={divStyle}>Status</div>

      </div>
      <div className="flex flex-col">
        {NonTransferItems.length > 0 ? (
          NonTransferItems.map((item) => (
            <NonTransferItem key={item.ino} item={item} transfer={false} />

          ))
        ) : (
          <p className="text-gray-500 justify-center d-flex font-bold pt-5">No non transfer donations</p>
        )}
      </div>
      <h2 className="text-2xl font-bold leading-7 pt-10 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Donations History
      </h2>

      <div className='flex justify-between py-3'>
        <div style={divStyle}>Item Name</div>
        <div style={divStyle}>Donor Name</div>
        <div style={divStyle}>Quantity</div>
        <div style={divStyle}>Date of Donation</div>
        <div style={divStyle}>Status</div>
      </div>
      <div className="flex flex-col">
        {serverHistory.length > 0 ? (
          serverHistory.map((item) => (
            <NonTransferItem key={item.ino} item={item} transfer={true} />
          ))
        ) : (
          <p className="text-gray-500 justify-center d-flex font-bold pt-5">No non transfer donations</p>
        )}
      </div>
    </div>
  );
}
