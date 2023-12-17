import React, { useContext, useEffect } from 'react'
import Item from './Item'
import ItemContext from '../context/itemsContext/ItemContext'
import alertContext from '../context/alertContext/AlertContext'
export default function ItemsUser() {
  const context1 = useContext(ItemContext);
  const context2 = useContext(alertContext);
  const { showAlert } = context2;
  const { getItemsByUser, UserItems } = context1;

  useEffect(() => {
    getItemsByUser();
  }, [])


  return (
    <>
      <h2 className="text-2xl font-bold leading-7 pt-10 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Donate Items Here
      </h2>

      <div >
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4">
              {UserItems.length === 0 ? (
                <p>No items available</p>
              ) : (
                UserItems.map((item) => <Item key={item.ino} user={true} item={item} />)
              )}
            </div>

          </div>
        </section>

      </div>
    </>


  )
}
