import React, { useContext, useEffect, useState } from 'react'
import Item from './Item'
import ItemContext from '../context/itemsContext/ItemContext'
import alertContext from '../context/alertContext/AlertContext'

export default function ItemServer() {
  const context1 = useContext(ItemContext);
  const context2 = useContext(alertContext);
  const { showAlert } = context2;
  const { getItemsByUser, uploadItem, UserItems } = context1;

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
    const message = await uploadItem(formData);
    if (itemCredentials.iquantity < 0) {
      setItemCredentials({ iname: "", iquantity: "", iphoto: null, iprice: "" });
      return showAlert("Add valid quantity", "success");
    }
    if (itemCredentials.iprice < 0) {
      setItemCredentials({ iname: "", iquantity: "", iphoto: "", iprice: "" });
      return showAlert("Add valid price", "success");
    }

    setItemCredentials({ iname: "", iquantity: "", iphoto: "", iprice: "" });
    showAlert(message.message, "success");
  }

  useEffect(() => {
    getItemsByUser();
  }, [])

  return (
    <div>

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
          UserItems.map((item) => <Item key={item.ino} item={item} />)
        )}
      </div>
    </div>
  );
}
