import React from 'react'
import Item from './Item'

export default function ItemsUser() {
  return (
    <>
      <h2 className="text-2xl font-bold leading-7 pt-10 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Donate Items Here
      </h2>

      <div >
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4">
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />

            </div>
          </div>
        </section>

      </div>
    </>


  )
}
