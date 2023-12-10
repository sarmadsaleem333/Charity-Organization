import React, { useContext } from 'react'
import ApplyCaseForm from './ApplyCaseForm'

export default function CaseApplicationUser() {

  return (
    <>
      <div><ApplyCaseForm /></div>
      <h1 className='text-center font-bold text-4xl py-2'>My In Progress Cases</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {/* <CaseCard/> */}
      </div>
      <h1 className='text-center font-bold text-4xl py-2'>My Applications </h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {/* <CaseCard/> */}
      </div>
      <h1 className='text-center font-bold text-4xl py-2'>My Completed Cases </h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {/* <CaseCard/> */}
      </div>
    
    </>
  )
}
