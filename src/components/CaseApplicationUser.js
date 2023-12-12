import React, { useContext, useEffect } from 'react'
import ApplyCaseForm from './ApplyCaseForm'
import userCaseContext from '../context/userCaseContext'
import CaseCard from './CaseCard';

export default function CaseApplicationUser() {
  const context = useContext(userCaseContext);
  const { AllUnApprovedCases, getAllUnApprovedCases } = context;

  useEffect(() => {
    getAllUnApprovedCases();
  }, [])


  return (
    <>
      <div><ApplyCaseForm /></div>
      <h1 className='text-center font-bold text-4xl py-2'>My Applications </h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {AllUnApprovedCases.length > 0 ? (
          AllUnApprovedCases.map((application) => (
            <CaseCard key={application.cno} caseItem={application} approved={false} />
          ))
        ) : (
          <p>You have no current applications.</p>
        )}
      </div>


    </>
  )
}
